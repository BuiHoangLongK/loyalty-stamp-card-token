export interface Merchant {
  id: string;
  name: string;
  assetCode: string;
  assetIssuer: string;
  stampsToReward: number;
  rewardDescription: string;
  createdAt: string;
}

export interface Customer {
  id: string;
  merchantId: string;
  name: string;
  stellarAddress: string;
  stampCount: number;
  totalRedeemed: number;
  createdAt: string;
}

export interface StampEvent {
  id: string;
  customerId: string;
  merchantId: string;
  eventType: string;
  amount: number;
  txHash: string;
  createdAt: string;
}

export interface MerchantStats {
  totalCustomers: number;
  readyToRedeem: number;
  totalStampsIssued: number;
  totalRedemptions: number;
}
