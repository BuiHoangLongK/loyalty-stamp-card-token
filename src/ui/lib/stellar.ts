import { StrKey } from '@stellar/stellar-sdk';

export function isValidPublicKey(publicKey: string): boolean {
  return StrKey.isValidEd25519PublicKey(publicKey);
}
