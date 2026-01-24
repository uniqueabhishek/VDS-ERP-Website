import { createClient } from '@libsql/client';

const url = process.env.TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;

if (!url || !authToken) {
  console.log('⚠️  TURSO_DATABASE_URL or TURSO_AUTH_TOKEN not set, skipping schema push');
  process.exit(0);
}

const client = createClient({ url, authToken });

const statements = [
  `CREATE TABLE IF NOT EXISTS "users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'accountant',
    "status" TEXT NOT NULL DEFAULT 'active',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastLogin" DATETIME
  )`,
  `CREATE UNIQUE INDEX IF NOT EXISTS "users_username_key" ON "users"("username")`,
  `CREATE UNIQUE INDEX IF NOT EXISTS "users_email_key" ON "users"("email")`,

  `CREATE TABLE IF NOT EXISTS "expenses" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "expenseType" TEXT NOT NULL,
    "amount" REAL NOT NULL,
    "expenseDate" DATETIME NOT NULL,
    "vendorName" TEXT NOT NULL,
    "paymentMethod" TEXT NOT NULL,
    "billNumber" TEXT,
    "description" TEXT,
    "receiptPath" TEXT,
    "createdBy" TEXT NOT NULL,
    "vendorId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "expenses_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "expenses_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "vendors" ("id") ON DELETE SET NULL ON UPDATE CASCADE
  )`,

  `CREATE TABLE IF NOT EXISTS "fixed_assets" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "assetName" TEXT NOT NULL,
    "description" TEXT,
    "location" TEXT NOT NULL,
    "purchaseDate" DATETIME NOT NULL,
    "purchaseValue" REAL NOT NULL,
    "currentValue" REAL,
    "status" TEXT NOT NULL DEFAULT 'active',
    "notes" TEXT,
    "createdBy" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "fixed_assets_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
  )`,

  `CREATE TABLE IF NOT EXISTS "vendors" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "contactPerson" TEXT,
    "phone" TEXT,
    "email" TEXT,
    "address" TEXT,
    "gstNumber" TEXT,
    "notes" TEXT,
    "createdBy" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "vendors_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
  )`,
  `CREATE UNIQUE INDEX IF NOT EXISTS "vendors_name_key" ON "vendors"("name")`,

  `CREATE TABLE IF NOT EXISTS "expense_types" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
  )`,
  `CREATE UNIQUE INDEX IF NOT EXISTS "expense_types_name_key" ON "expense_types"("name")`,
];

async function pushSchema() {
  console.log('🔄 Pushing schema to Turso database...');

  for (const sql of statements) {
    try {
      await client.execute(sql);
    } catch (error) {
      // Ignore "already exists" errors, throw others
      if (!error.message?.includes('already exists')) {
        console.error('❌ Error executing:', sql.substring(0, 50) + '...');
        throw error;
      }
    }
  }

  console.log('✅ Schema pushed successfully to Turso!');
}

pushSchema()
  .catch((error) => {
    console.error('❌ Schema push failed:', error.message);
    process.exit(1);
  })
  .finally(() => {
    client.close();
  });
