#![no_std]

use soroban_sdk::{
    contract, contracterror, contractevent, contractimpl, contracttype, Address, BytesN, Env, Vec,
};

const INSTANCE_BUMP_LEDGERS: u32 = 30 * 17_280;
const INSTANCE_LIFETIME_THRESHOLD: u32 = INSTANCE_BUMP_LEDGERS - 17_280;
const STAMP_BUMP_LEDGERS: u32 = 90 * 17_280;
const STAMP_LIFETIME_THRESHOLD: u32 = STAMP_BUMP_LEDGERS - 17_280;

#[derive(Clone, Debug, Eq, PartialEq)]
#[contracttype]
pub enum StampStatus {
    Issued,
    Redeemed,
    ClawedBack,
}

#[derive(Clone, Debug, Eq, PartialEq)]
#[contracttype]
pub struct Stamp {
    pub merchant: Address,
    pub customer: Address,
    pub status: StampStatus,
}

#[derive(Clone)]
#[contracttype]
enum DataKey {
    Admin,
    StampsRequired,
    Balance(Address),
    Stamp(BytesN<32>),
}

#[derive(Clone, Copy, Debug, Eq, PartialEq)]
#[contracterror]
#[repr(u32)]
pub enum Error {
    AlreadyInitialized = 1,
    NotInitialized = 2,
    InvalidThreshold = 3,
    StampExists = 4,
    StampNotFound = 5,
    InvalidStampStatus = 6,
    NotEnoughStamps = 7,
    WrongCustomer = 8,
    InvalidAmount = 9,
}

#[contract]
pub struct StampCardContract;

#[contractevent(data_format = "single-value")]
pub struct StampCardInitialized {
    pub admin: Address,
}

#[contractevent(data_format = "single-value")]
pub struct StampIssued {
    pub stamp_id: BytesN<32>,
}

#[contractevent(data_format = "single-value")]
pub struct StampRedeemed {
    pub customer: Address,
}

#[contractevent(data_format = "single-value")]
pub struct StampClawedBack {
    pub stamp_id: BytesN<32>,
}

#[contractimpl]
impl StampCardContract {
    pub fn initialize(e: Env, admin: Address, stamps_required: u32) -> Result<(), Error> {
        if e.storage().instance().has(&DataKey::Admin) {
            return Err(Error::AlreadyInitialized);
        }
        if stamps_required == 0 {
            return Err(Error::InvalidThreshold);
        }
        admin.require_auth();
        e.storage().instance().set(&DataKey::Admin, &admin);
        e.storage()
            .instance()
            .set(&DataKey::StampsRequired, &stamps_required);
        e.storage()
            .instance()
            .extend_ttl(INSTANCE_LIFETIME_THRESHOLD, INSTANCE_BUMP_LEDGERS);
        StampCardInitialized { admin }.publish(&e);
        Ok(())
    }

    pub fn admin(e: Env) -> Result<Address, Error> {
        Self::read_admin(&e)
    }

    pub fn stamps_required(e: Env) -> Result<u32, Error> {
        e.storage()
            .instance()
            .get(&DataKey::StampsRequired)
            .ok_or(Error::NotInitialized)
    }

    pub fn issue_stamp(
        e: Env,
        stamp_id: BytesN<32>,
        merchant: Address,
        customer: Address,
    ) -> Result<(), Error> {
        let admin = Self::read_admin(&e)?;
        admin.require_auth();
        let key = DataKey::Stamp(stamp_id.clone());
        if e.storage().persistent().has(&key) {
            return Err(Error::StampExists);
        }

        e.storage().persistent().set(
            &key,
            &Stamp {
                merchant,
                customer: customer.clone(),
                status: StampStatus::Issued,
            },
        );
        e.storage()
            .persistent()
            .extend_ttl(&key, STAMP_LIFETIME_THRESHOLD, STAMP_BUMP_LEDGERS);
        Self::adjust_balance(&e, &customer, 1)?;
        StampIssued { stamp_id }.publish(&e);
        Ok(())
    }

    pub fn balance(e: Env, customer: Address) -> Result<u32, Error> {
        Self::read_balance(&e, &customer)
    }

    pub fn redeem(e: Env, customer: Address, stamp_ids: Vec<BytesN<32>>) -> Result<(), Error> {
        customer.require_auth();
        let required = Self::read_required(&e)?;
        if stamp_ids.len() != required {
            return Err(Error::NotEnoughStamps);
        }

        let mut index = 0;
        while index < stamp_ids.len() {
            let stamp_id = stamp_ids.get(index).ok_or(Error::StampNotFound)?;
            let key = DataKey::Stamp(stamp_id);
            let mut stamp = e
                .storage()
                .persistent()
                .get::<DataKey, Stamp>(&key)
                .ok_or(Error::StampNotFound)?;
            if stamp.customer != customer {
                return Err(Error::WrongCustomer);
            }
            if stamp.status != StampStatus::Issued {
                return Err(Error::InvalidStampStatus);
            }
            stamp.status = StampStatus::Redeemed;
            e.storage().persistent().set(&key, &stamp);
            e.storage()
                .persistent()
                .extend_ttl(&key, STAMP_LIFETIME_THRESHOLD, STAMP_BUMP_LEDGERS);
            index += 1;
        }

        Self::adjust_balance(&e, &customer, -(stamp_ids.len() as i64))?;
        StampRedeemed { customer }.publish(&e);
        Ok(())
    }

    pub fn clawback(e: Env, stamp_id: BytesN<32>) -> Result<(), Error> {
        let admin = Self::read_admin(&e)?;
        admin.require_auth();
        let key = DataKey::Stamp(stamp_id.clone());
        let mut stamp = e
            .storage()
            .persistent()
            .get::<DataKey, Stamp>(&key)
            .ok_or(Error::StampNotFound)?;
        if stamp.status != StampStatus::Issued {
            return Err(Error::InvalidStampStatus);
        }
        stamp.status = StampStatus::ClawedBack;
        let customer = stamp.customer.clone();
        e.storage().persistent().set(&key, &stamp);
        e.storage()
            .persistent()
            .extend_ttl(&key, STAMP_LIFETIME_THRESHOLD, STAMP_BUMP_LEDGERS);
        Self::adjust_balance(&e, &customer, -1)?;
        StampClawedBack { stamp_id }.publish(&e);
        Ok(())
    }

    pub fn get_stamp(e: Env, stamp_id: BytesN<32>) -> Result<Stamp, Error> {
        e.storage()
            .persistent()
            .get(&DataKey::Stamp(stamp_id))
            .ok_or(Error::StampNotFound)
    }
}

impl StampCardContract {
    fn read_admin(e: &Env) -> Result<Address, Error> {
        e.storage()
            .instance()
            .get(&DataKey::Admin)
            .ok_or(Error::NotInitialized)
    }

    fn read_required(e: &Env) -> Result<u32, Error> {
        e.storage()
            .instance()
            .get(&DataKey::StampsRequired)
            .ok_or(Error::NotInitialized)
    }

    fn read_balance(e: &Env, customer: &Address) -> Result<u32, Error> {
        Ok(e.storage()
            .persistent()
            .get(&DataKey::Balance(customer.clone()))
            .unwrap_or(0))
    }

    fn adjust_balance(e: &Env, customer: &Address, delta: i64) -> Result<(), Error> {
        let current = Self::read_balance(e, customer)? as i64;
        let next = current + delta;
        if next < 0 {
            return Err(Error::InvalidAmount);
        }
        let key = DataKey::Balance(customer.clone());
        e.storage().persistent().set(&key, &(next as u32));
        e.storage()
            .persistent()
            .extend_ttl(&key, STAMP_LIFETIME_THRESHOLD, STAMP_BUMP_LEDGERS);
        Ok(())
    }
}

#[cfg(test)]
mod test {
    extern crate std;

    use super::{Error, StampCardContract, StampCardContractClient, StampStatus};
    use soroban_sdk::{testutils::Address as _, Address, BytesN, Env, Vec};

    fn id(e: &Env, value: u8) -> BytesN<32> {
        BytesN::from_array(e, &[value; 32])
    }

    fn setup<'a>(e: &'a Env) -> (StampCardContractClient<'a>, Address, Address, Address) {
        let admin = Address::generate(e);
        let merchant = Address::generate(e);
        let customer = Address::generate(e);
        let contract_id = e.register(StampCardContract, ());
        let client = StampCardContractClient::new(e, &contract_id);
        e.mock_all_auths();
        client.initialize(&admin, &2);
        (client, admin, merchant, customer)
    }

    #[test]
    fn issue_balance_redeem_round_trip() {
        let e = Env::default();
        let (client, _admin, merchant, customer) = setup(&e);
        let first = id(&e, 1);
        let second = id(&e, 2);

        client.issue_stamp(&first, &merchant, &customer);
        client.issue_stamp(&second, &merchant, &customer);
        assert_eq!(client.balance(&customer), 2);

        let mut stamps = Vec::new(&e);
        stamps.push_back(first.clone());
        stamps.push_back(second.clone());
        client.redeem(&customer, &stamps);
        assert_eq!(client.balance(&customer), 0);
        assert_eq!(client.get_stamp(&first).status, StampStatus::Redeemed);
    }

    #[test]
    fn duplicate_and_invalid_actions_are_rejected() {
        let e = Env::default();
        let (client, _admin, merchant, customer) = setup(&e);
        let first = id(&e, 3);

        client.issue_stamp(&first, &merchant, &customer);
        assert_eq!(
            client
                .try_issue_stamp(&first, &merchant, &customer)
                .unwrap_err()
                .unwrap(),
            Error::StampExists
        );
        let empty = Vec::new(&e);
        assert_eq!(
            client.try_redeem(&customer, &empty).unwrap_err().unwrap(),
            Error::NotEnoughStamps
        );
        client.clawback(&first);
        assert_eq!(
            client.try_clawback(&first).unwrap_err().unwrap(),
            Error::InvalidStampStatus
        );
    }

    #[test]
    fn clawback_removes_issued_stamp() {
        let e = Env::default();
        let (client, _admin, merchant, customer) = setup(&e);
        let first = id(&e, 4);

        client.issue_stamp(&first, &merchant, &customer);
        client.clawback(&first);
        assert_eq!(client.balance(&customer), 0);
        assert_eq!(client.get_stamp(&first).status, StampStatus::ClawedBack);
        assert_eq!(
            client.try_clawback(&first).unwrap_err().unwrap(),
            Error::InvalidStampStatus
        );
    }
}
