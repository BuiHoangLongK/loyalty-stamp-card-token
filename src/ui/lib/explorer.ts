export function explorerTxUrl(network: string, hash: string): string {
  const base =
    network === 'public'
      ? 'https://stellar.expert/explorer/public/tx'
      : network === 'testnet'
        ? 'https://stellar.expert/explorer/testnet/tx'
        : 'https://stellar.expert/explorer/futurenet/tx';
  return `${base}/${hash}`;
}

export function explorerAccountUrl(network: string, address: string): string {
  const base =
    network === 'public'
      ? 'https://stellar.expert/explorer/public/account'
      : network === 'testnet'
        ? 'https://stellar.expert/explorer/testnet/account'
        : 'https://stellar.expert/explorer/futurenet/account';
  return `${base}/${address}`;
}

export function timeUntil(iso: string): string {
  const ms = new Date(iso).getTime() - Date.now();
  if (ms <= 0) return 'expired';
  const sec = Math.floor(ms / 1000);
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}
