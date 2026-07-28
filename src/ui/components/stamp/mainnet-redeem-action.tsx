'use client';

import { getNetworkDetails, signTransaction } from '@stellar/freighter-api';
import {
  Address,
  Networks,
  nativeToScVal,
  Operation,
  rpc,
  TransactionBuilder,
  xdr,
} from '@stellar/stellar-sdk';
import { CheckCircle, Copy, ExternalLink, Loader2, Wallet } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/ui/components/ui/button';
import { useFreighter } from '@/ui/hooks/useFreighter';

const CONTRACT_ID = 'CABAYBURYKWLN5ZRR3CZHFO5HT5P72HH7RJJAFDSDL3A5KTARFYEUNGU';
const RPC_URL = 'https://mainnet.sorobanrpc.com';
const STAMP_IDS = [
  '071e7f8941af4bf296310a07342b7086ca0baf36e4c2d4554996bce6afa29388',
  'c1eb4638f2c244676fde40d4c9e76498c94518f91dae0d7ea2f8621a709b0f1d',
];

function hexToBytes(value: string): Uint8Array {
  return Uint8Array.from(value.match(/.{2}/g)?.map((byte) => Number.parseInt(byte, 16)) ?? []);
}

export function MainnetRedeemAction() {
  const { publicKey, isAvailable, connect } = useFreighter();
  const [xdrValue, setXdrValue] = useState<string | null>(null);
  const [txHash, setTxHash] = useState<string | null>(null);
  const [state, setState] = useState<'idle' | 'building' | 'signing' | 'done' | 'error'>('idle');
  const [error, setError] = useState('');

  async function prepare() {
    if (!publicKey) {
      await connect();
      return;
    }
    setState('building');
    setError('');
    try {
      const server = new rpc.Server(RPC_URL);
      const account = await server.getAccount(publicKey);
      const raw = new TransactionBuilder(account, {
        fee: '100',
        networkPassphrase: Networks.PUBLIC,
      })
        .addOperation(
          Operation.invokeContractFunction({
            contract: CONTRACT_ID,
            function: 'redeem',
            args: [
              Address.fromString(publicKey).toScVal(),
              xdr.ScVal.scvVec(
                STAMP_IDS.map((id) => nativeToScVal(hexToBytes(id), { type: 'bytes' })),
              ),
            ],
          }),
        )
        .setTimeout(86_400)
        .build();
      const simulation = await server.simulateTransaction(raw);
      if ('error' in simulation && simulation.error) throw new Error(simulation.error);
      const assembled = rpc.assembleTransaction(raw, simulation).build();
      setXdrValue(assembled.toXDR());
      setTxHash(assembled.hash().toString('hex'));
      setState('idle');
    } catch (cause) {
      setState('error');
      setError(cause instanceof Error ? cause.message : 'Could not build the mainnet XDR');
    }
  }

  async function sign() {
    if (!xdrValue || !publicKey) return;
    setState('signing');
    setError('');
    try {
      const { networkPassphrase } = await getNetworkDetails();
      if (networkPassphrase !== Networks.PUBLIC) {
        throw new Error('Set Freighter to Stellar Mainnet before signing.');
      }
      const signed = await signTransaction(xdrValue, {
        address: publicKey,
        networkPassphrase: Networks.PUBLIC,
      });
      if (signed.error) throw new Error(String(signed.error));
      const transaction = TransactionBuilder.fromXDR(signed.signedTxXdr, Networks.PUBLIC);
      setTxHash(transaction.hash().toString('hex'));
      setState('done');
    } catch (cause) {
      setState('error');
      setError(cause instanceof Error ? cause.message : 'Freighter signing failed');
    }
  }

  return (
    <section className="mb-8 rounded-2xl border border-violet-200 bg-violet-50 p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="font-sans text-lg font-bold text-violet-900">Mainnet contract action</h2>
          <p className="mt-1 text-sm text-violet-800">
            Redeem the verified two-stamp Soroban flow. The app prepares and signs only; it never
            submits.
          </p>
          <p className="mt-1 break-all font-mono text-xs text-violet-700">
            {publicKey ?? 'No wallet connected'}
          </p>
        </div>
        <span className="rounded-full bg-white px-3 py-1 font-mono text-xs text-violet-700">
          {CONTRACT_ID.slice(0, 10)}…
        </span>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={() => void connect()}
          disabled={!isAvailable && state === 'building'}
        >
          <Wallet className="mr-2 h-4 w-4" /> {publicKey ? 'Wallet connected' : 'Connect Freighter'}
        </Button>
        <Button
          type="button"
          onClick={() => void prepare()}
          disabled={!publicKey || state === 'building'}
          className="bg-violet-600 hover:bg-violet-700"
        >
          {state === 'building' ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          Build mainnet XDR
        </Button>
        {xdrValue ? (
          <Button
            type="button"
            onClick={() => void sign()}
            disabled={state === 'signing'}
            className="bg-gray-900 hover:bg-gray-800"
          >
            <CheckCircle className="mr-2 h-4 w-4" /> Sign in Freighter
          </Button>
        ) : null}
      </div>
      {xdrValue ? (
        <div className="mt-4 rounded-lg bg-gray-950 p-3">
          <div className="mb-1 flex items-center justify-between text-xs text-gray-400">
            <span>Unsigned XDR ready</span>
            <button
              type="button"
              onClick={() => void navigator.clipboard.writeText(xdrValue)}
              className="inline-flex items-center gap-1 hover:text-white"
            >
              <Copy className="h-3 w-3" /> Copy
            </button>
          </div>
          <code className="block max-h-24 overflow-auto break-all text-[10px] text-green-300">
            {xdrValue}
          </code>
        </div>
      ) : null}
      {txHash && state !== 'done' ? (
        <p className="mt-3 break-all text-xs text-violet-800">
          Unsigned transaction hash: {txHash}
        </p>
      ) : null}
      {state === 'done' && txHash ? (
        <div className="mt-3 rounded-lg bg-green-50 p-3 text-sm text-green-800">
          <div className="flex items-center gap-2 font-semibold">
            <CheckCircle className="h-4 w-4" /> Signed successfully (not submitted)
          </div>
          <code className="mt-1 block break-all text-xs">Hash: {txHash}</code>
          <a
            className="mt-1 inline-flex items-center gap-1 text-xs underline"
            href={`https://stellar.expert/explorer/public/tx/${txHash}`}
            target="_blank"
            rel="noreferrer"
          >
            Open explorer <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      ) : null}
      {state === 'error' ? (
        <p className="mt-3 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>
      ) : null}
    </section>
  );
}
