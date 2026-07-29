const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const {
  Address,
  nativeToScVal,
  Networks,
  Operation,
  TransactionBuilder,
  xdr: stellarXdr,
  rpc,
} = require('@stellar/stellar-sdk');

const SOURCE = 'GD3RGSAERNRC52CQFAUVSE7PZWACGP7W522MSWAYZQQMYAVI2Q5Z6SB6';
const ROOT = path.resolve(__dirname, '..');
const WASM_PATH = path.resolve(
  ROOT,
  'contracts/stamp-card/target/wasm32v1-none/release/stampchain_stamp_card.wasm',
);
const STAMPS_REQUIRED = 2;
const MERCHANT = SOURCE;
const CUSTOMER = SOURCE;
const WASM_HASH = crypto.createHash('sha256').update(fs.readFileSync(WASM_PATH)).digest('hex');
const SALT = crypto.createHash('sha256').update('031-stampchain-stamp-card-v1').digest();
const STAMP_IDS = [
  crypto.createHash('sha256').update('031-stamp-1').digest(),
  crypto.createHash('sha256').update('031-stamp-2').digest(),
];
const RPC_URL = process.env.STELLAR_RPC_URL || 'https://mainnet.sorobanrpc.com';

function option(name, fallback) {
  const index = process.argv.indexOf(`--${name}`);
  return index >= 0 ? process.argv[index + 1] : fallback;
}

function outputPath(stage) {
  return path.resolve(ROOT, `contracts/stamp-card/mainnet-${stage}-assembled.xdr`);
}

function address(value) {
  return Address.fromString(value).toScVal();
}

async function main() {
  const stage = option('stage');
  const contract = option('contract-id');
  const allowed = [
    'upload',
    'deploy',
    'initialize',
    'issue-stamp-1',
    'issue-stamp-2',
    'redeem',
    'clawback-1',
  ];
  if (!allowed.includes(stage)) {
    throw new Error(
      `Usage: node scripts/assemble-mainnet-tx.cjs --stage ${allowed.join('|')} [--contract-id C...]`,
    );
  }

  const server = new rpc.Server(RPC_URL);
  const account = await server.getAccount(SOURCE);
  const builder = new TransactionBuilder(account, {
    fee: '100',
    networkPassphrase: Networks.PUBLIC,
  });

  if (stage === 'upload') {
    builder.addOperation(Operation.uploadContractWasm({ wasm: fs.readFileSync(WASM_PATH) }));
  } else if (stage === 'deploy') {
    builder.addOperation(
      Operation.createCustomContract({
        address: Address.fromString(SOURCE),
        wasmHash: Buffer.from(WASM_HASH, 'hex'),
        salt: SALT,
      }),
    );
  } else {
    if (!contract) throw new Error(`--contract-id is required for ${stage}`);
    if (stage === 'initialize') {
      builder.addOperation(
        Operation.invokeContractFunction({
          contract,
          function: 'initialize',
          args: [address(SOURCE), nativeToScVal(STAMPS_REQUIRED, { type: 'u32' })],
        }),
      );
    } else if (stage === 'issue-stamp-1' || stage === 'issue-stamp-2') {
      const stampId = STAMP_IDS[stage.endsWith('1') ? 0 : 1];
      builder.addOperation(
        Operation.invokeContractFunction({
          contract,
          function: 'issue_stamp',
          args: [nativeToScVal(stampId, { type: 'bytes' }), address(MERCHANT), address(CUSTOMER)],
        }),
      );
    } else if (stage === 'redeem') {
      builder.addOperation(
        Operation.invokeContractFunction({
          contract,
          function: 'redeem',
          args: [
            address(CUSTOMER),
            stellarXdr.ScVal.scvVec(STAMP_IDS.map((id) => nativeToScVal(id, { type: 'bytes' }))),
          ],
        }),
      );
    } else if (stage === 'clawback-1') {
      builder.addOperation(
        Operation.invokeContractFunction({
          contract,
          function: 'clawback',
          args: [nativeToScVal(STAMP_IDS[0], { type: 'bytes' })],
        }),
      );
    }
  }

  const raw = builder.setTimeout(86400).build();
  const simulation = await server.simulateTransaction(raw);
  if (simulation.error) throw new Error(simulation.error);
  const assembled = rpc.assembleTransaction(raw, simulation).build();
  const xdr = assembled.toXDR();
  const destination = outputPath(stage);
  fs.writeFileSync(destination, `${xdr}\n`, { mode: 0o600 });
  const report = {
    stage,
    rpcUrl: RPC_URL,
    outputPath: destination,
    hash: assembled.hash().toString('hex'),
    sequence: assembled.sequence.toString(),
    minResourceFee: simulation.minResourceFee,
    latestLedger: simulation.latestLedger,
    wasmSha256: crypto.createHash('sha256').update(fs.readFileSync(WASM_PATH)).digest('hex'),
  };
  if (stage === 'deploy' && simulation.result?.retval) {
    try {
      report.contractId = Address.fromScVal(simulation.result.retval).toString();
    } catch {
      // The contract ID can still be recovered from the successful deploy result.
    }
  }
  console.log(JSON.stringify(report, null, 2));
}

main().catch((error) => {
  console.error(error.stack || error.message || error);
  process.exitCode = 1;
});
