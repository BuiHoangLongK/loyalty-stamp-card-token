import { Horizon, Networks } from '@stellar/stellar-sdk';
import { STELLAR_NETWORK_PASSPHRASES } from '@/server/lib/stamp';
import { env } from './env';

const networkMap = {
  testnet: {
    passphrase: Networks.TESTNET,
    horizonUrl: 'https://horizon-testnet.stellar.org',
  },
  public: {
    passphrase: Networks.PUBLIC,
    horizonUrl: 'https://horizon.stellar.org',
  },
  futurenet: {
    passphrase: Networks.FUTURENET,
    horizonUrl: 'https://horizon-futurenet.stellar.org',
  },
} as const;

const cfg = networkMap[env.STELLAR_NETWORK];

if (env.STELLAR_NETWORK_PASSPHRASE !== STELLAR_NETWORK_PASSPHRASES[env.STELLAR_NETWORK]) {
  throw new Error('STELLAR_NETWORK_PASSPHRASE does not match STELLAR_NETWORK');
}

export const stellar = {
  passphrase: cfg.passphrase,
  horizonUrl: env.STELLAR_HORIZON_URL,
  network: env.STELLAR_NETWORK,
  server: new Horizon.Server(env.STELLAR_HORIZON_URL),
} as const;
