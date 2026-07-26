import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from '../src/server/db/schema';
import { customers, merchants, redemptions, stampEvents } from '../src/server/db/schema';

if (process.env.DEMO_MODE !== 'true' || process.env.STELLAR_NETWORK === 'public') {
  throw new Error('seed-demo requires DEMO_MODE=true and a non-mainnet STELLAR_NETWORK');
}

const pool = new Pool({ connectionString: process.env.DRIZZLE_DATABASE_URL });
const db = drizzle(pool, { schema });

async function seed() {
  console.log('🌱 Seeding StampChain demo data...');

  // Clear tables
  await db.delete(redemptions);
  await db.delete(stampEvents);
  await db.delete(customers);
  await db.delete(merchants);

  // Merchant: Dang Thi Hoa's Coffee Shop
  const [merchant] = await db
    .insert(merchants)
    .values({
      name: "Hoa's Coffee — Hanoi",
      assetCode: 'COFFEE',
      assetIssuer: 'GCOFFEEHOAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
      stampsToReward: 10,
      rewardDescription: 'Free Iced Latte (trị giá ₫45,000)',
    })
    .returning();

  // Customers
  const [minhTuan] = await db
    .insert(customers)
    .values({
      merchantId: merchant.id,
      name: 'Minh Tuấn',
      stellarAddress: 'GMINHTUAN1XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
      stampCount: 8,
      totalRedeemed: 0,
    })
    .returning();

  const [linhPhuong] = await db
    .insert(customers)
    .values({
      merchantId: merchant.id,
      name: 'Linh Phương',
      stellarAddress: 'GLINHPHUONG1XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
      stampCount: 10,
      totalRedeemed: 10,
    })
    .returning();

  const [hungNam] = await db
    .insert(customers)
    .values({
      merchantId: merchant.id,
      name: 'Hùng Nam',
      stellarAddress: 'GHUNGNAM1XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
      stampCount: 3,
      totalRedeemed: 0,
    })
    .returning();

  // Stamp events for Minh Tuan (8 stamps)
  for (let i = 0; i < 8; i++) {
    await db.insert(stampEvents).values({
      customerId: minhTuan.id,
      merchantId: merchant.id,
      eventType: 'issued',
      amount: 1,
      txHash: `A${i}B2C3D4E5F6A7B8C9D0E1F2A3B4C5D6E7F8A9B0C1D2E3F4A5B6C7D8E9F${i}A1B2`
        .padEnd(64, '0')
        .slice(0, 64),
    });
  }

  // Stamp events for Linh Phuong (past redemption)
  for (let i = 0; i < 10; i++) {
    await db.insert(stampEvents).values({
      customerId: linhPhuong.id,
      merchantId: merchant.id,
      eventType: 'issued',
      amount: 1,
      txHash: `B${i}C3D4E5F6A7B8C9D0E1F2A3B4C5D6E7F8A9B0C1D2E3F4A5B6C7D8E9F0A${i}`
        .padEnd(64, '0')
        .slice(0, 64),
    });
  }

  // Past redemption (clawback) for Linh Phuong
  const clawbackHash = 'CLAWBACK1234567890ABCDEF1234567890ABCDEF1234567890ABCDEF12345678';
  await db.insert(stampEvents).values({
    customerId: linhPhuong.id,
    merchantId: merchant.id,
    eventType: 'clawback',
    amount: 10,
    txHash: clawbackHash,
  });

  await db.insert(redemptions).values({
    customerId: linhPhuong.id,
    merchantId: merchant.id,
    stampsUsed: 10,
    reward: 'Free Iced Latte (trị giá ₫45,000)',
  });

  // Current 10 stamps for Linh Phuong (ready to redeem again)
  for (let i = 0; i < 10; i++) {
    await db.insert(stampEvents).values({
      customerId: linhPhuong.id,
      merchantId: merchant.id,
      eventType: 'issued',
      amount: 1,
      txHash: `C${i}D4E5F6A7B8C9D0E1F2A3B4C5D6E7F8A9B0C1D2E3F4A5B6C7D8E9F0A1B${i}`
        .padEnd(64, '0')
        .slice(0, 64),
    });
  }

  // Stamps for Hung Nam
  for (let i = 0; i < 3; i++) {
    await db.insert(stampEvents).values({
      customerId: hungNam.id,
      merchantId: merchant.id,
      eventType: 'issued',
      amount: 1,
      txHash: `D${i}E5F6A7B8C9D0E1F2A3B4C5D6E7F8A9B0C1D2E3F4A5B6C7D8E9F0A1B2C${i}`
        .padEnd(64, '0')
        .slice(0, 64),
    });
  }

  console.log('✅ Seed complete!');
  console.log(`Merchant: ${merchant.name} (id: ${merchant.id})`);
  console.log(`  Customer Minh Tuấn: 8 stamps (id: ${minhTuan.id})`);
  console.log(`  Customer Linh Phương: 10 stamps READY TO REDEEM (id: ${linhPhuong.id})`);
  console.log(`  Customer Hùng Nam: 3 stamps (id: ${hungNam.id})`);
  console.log(`  Clawback TX: ${clawbackHash}`);

  console.log('\n📋 Copy for .env.local or use in app:');
  console.log(`DEMO_MERCHANT_ID="${merchant.id}"`);
  console.log(`DEMO_CUSTOMER_LINH_ID="${linhPhuong.id}"`);

  await pool.end();
}

seed().catch(console.error);
