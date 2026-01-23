# Database Documentation

Complete reference for the VDS ERP database schema, migrations, and best practices.

## Table of Contents

1. [Overview](#overview)
2. [Database Schema](#database-schema)
3. [Entity Relationships](#entity-relationships)
4. [Field Descriptions](#field-descriptions)
5. [Migrations](#migrations)
6. [Seeding Data](#seeding-data)
7. [Querying Patterns](#querying-patterns)
8. [Performance Optimization](#performance-optimization)
9. [Backup & Recovery](#backup--recovery)
10. [Common Operations](#common-operations)

---

## Overview

### Technology

- **ORM**: Prisma 6.19.2
- **Development DB**: SQLite (file-based)
- **Production DB**: PostgreSQL (recommended)
- **Migration System**: Prisma Migrate

### Database Location

**Development:**
```
prisma/dev.db
```

**Production:**
```
PostgreSQL (hosted on Supabase, Neon, AWS RDS, etc.)
```

### Connection Management

- **Prisma Client**: Singleton pattern in `lib/db.ts`
- **Connection Pooling**: Configured via DATABASE_URL parameters
- **Max Connections**: 10 (development), 20+ (production)

---

## Database Schema

### Visual Schema Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                            User                             │
├─────────────────────────────────────────────────────────────┤
│ id: String (PK, cuid)                                       │
│ username: String (unique)                                   │
│ email: String (unique)                                      │
│ passwordHash: String                                        │
│ fullName: String                                            │
│ role: String (default: "accountant")                        │
│ status: String (default: "active")                          │
│ lastLogin: DateTime?                                        │
│ createdAt: DateTime (auto)                                  │
│ updatedAt: DateTime (auto)                                  │
└─────────────────────────────────────────────────────────────┘
         │                    │                    │
         │ 1:N                │ 1:N                │ 1:N
         │ createdBy          │ createdBy          │ createdBy
         ▼                    ▼                    ▼
┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐
│    Expense       │  │   FixedAsset     │  │     Vendor       │
├──────────────────┤  ├──────────────────┤  ├──────────────────┤
│ id (PK)          │  │ id (PK)          │  │ id (PK)          │
│ expenseType      │  │ assetName        │  │ name (unique)    │
│ amount           │  │ description?     │  │ contactPerson?   │
│ expenseDate      │  │ location         │  │ phone?           │
│ vendorName       │  │ purchaseDate     │  │ email?           │
│ paymentMethod    │  │ purchaseValue    │  │ address?         │
│ billNumber?      │  │ currentValue?    │  │ gstNumber?       │
│ description?     │  │ status           │  │ notes?           │
│ receiptPath?     │  │ notes?           │  │ createdBy (FK)   │
│ createdBy (FK)   │  │ createdBy (FK)   │  │ createdAt        │
│ vendorId? (FK)   │  │ createdAt        │  │ updatedAt        │
│ createdAt        │  │ updatedAt        │  └──────────────────┘
│ updatedAt        │  └──────────────────┘           │
└──────────────────┘                                 │
         ▲                                           │
         │ N:1                                       │
         │ vendor                                    │
         └───────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│                        ExpenseType                           │
├──────────────────────────────────────────────────────────────┤
│ id: String (PK, cuid)                                        │
│ name: String (unique)                                        │
│ description: String?                                         │
│ createdAt: DateTime (auto)                                   │
│ updatedAt: DateTime (auto)                                   │
└──────────────────────────────────────────────────────────────┘
```

---

## Database Schema

### Complete Prisma Schema

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"  // or "postgresql" for production
  url      = env("DATABASE_URL")
}

// ============================================================
// USER MODEL
// ============================================================

model User {
  id           String   @id @default(cuid())
  username     String   @unique
  email        String   @unique
  passwordHash String
  fullName     String
  role         String   @default("accountant")
  status       String   @default("active")
  lastLogin    DateTime?

  // Relations
  expenses     Expense[]
  fixedAssets  FixedAsset[]
  vendors      Vendor[]

  // Timestamps
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt

  @@map("users")
}

// ============================================================
// EXPENSE MODEL
// ============================================================

model Expense {
  id            String   @id @default(cuid())
  expenseType   String
  amount        Float
  expenseDate   DateTime
  vendorName    String
  paymentMethod String   // Cash, UPI, Bank Transfer, Cheque
  billNumber    String?
  description   String?
  receiptPath   String?

  // Foreign Keys
  createdBy     String
  user          User     @relation(fields: [createdBy], references: [id], onDelete: Cascade)

  vendorId      String?
  vendor        Vendor?  @relation(fields: [vendorId], references: [id], onDelete: SetNull)

  // Timestamps
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt

  // Indexes
  @@index([expenseDate])
  @@index([createdBy])
  @@index([vendorId])
  @@index([expenseType])
  @@index([createdAt])

  @@map("expenses")
}

// ============================================================
// FIXED ASSET MODEL
// ============================================================

model FixedAsset {
  id            String   @id @default(cuid())
  assetName     String
  description   String?
  location      String
  purchaseDate  DateTime
  purchaseValue Float
  currentValue  Float?
  status        String   // active, under maintenance, disposed
  notes         String?

  // Foreign Keys
  createdBy     String
  user          User     @relation(fields: [createdBy], references: [id], onDelete: Cascade)

  // Timestamps
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt

  // Indexes
  @@index([createdBy])
  @@index([status])
  @@index([purchaseDate])

  @@map("fixed_assets")
}

// ============================================================
// VENDOR MODEL
// ============================================================

model Vendor {
  id            String   @id @default(cuid())
  name          String   @unique
  contactPerson String?
  phone         String?
  email         String?
  address       String?
  gstNumber     String?  @db.VarChar(15)
  notes         String?

  // Foreign Keys
  createdBy     String
  user          User     @relation(fields: [createdBy], references: [id], onDelete: Cascade)

  // Relations
  expenses      Expense[]

  // Timestamps
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt

  // Indexes
  @@index([createdBy])
  @@index([name])

  @@map("vendors")
}

// ============================================================
// EXPENSE TYPE MODEL
// ============================================================

model ExpenseType {
  id          String   @id @default(cuid())
  name        String   @unique
  description String?

  // Timestamps
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@map("expense_types")
}
```

---

## Entity Relationships

### User → Expense (1:N)

**Relationship Type**: One-to-Many

**Foreign Key**: `Expense.createdBy → User.id`

**Cascade Behavior**:
- `onDelete: Cascade` - Deleting a user deletes all their expenses

**Use Case**: Track which user created each expense for audit purposes.

```prisma
model User {
  expenses Expense[]
}

model Expense {
  createdBy String
  user      User   @relation(fields: [createdBy], references: [id], onDelete: Cascade)
}
```

### User → FixedAsset (1:N)

**Relationship Type**: One-to-Many

**Foreign Key**: `FixedAsset.createdBy → User.id`

**Cascade Behavior**:
- `onDelete: Cascade` - Deleting a user deletes all their asset records

**Use Case**: Accountability for asset registration.

### User → Vendor (1:N)

**Relationship Type**: One-to-Many

**Foreign Key**: `Vendor.createdBy → User.id`

**Cascade Behavior**:
- `onDelete: Cascade` - Deleting a user deletes all vendors they created

**Use Case**: Track who added each vendor.

### Vendor → Expense (1:N)

**Relationship Type**: One-to-Many (Optional)

**Foreign Key**: `Expense.vendorId → Vendor.id`

**Cascade Behavior**:
- `onDelete: SetNull` - Deleting a vendor sets `vendorId` to `null` in expenses (preserves expense records)

**Use Case**: Link expenses to vendors for reporting and analysis.

```prisma
model Vendor {
  expenses Expense[]
}

model Expense {
  vendorId String?
  vendor   Vendor? @relation(fields: [vendorId], references: [id], onDelete: SetNull)
}
```

---

## Field Descriptions

### User Model

| Field | Type | Nullable | Description |
|-------|------|----------|-------------|
| id | String (cuid) | No | Primary key, auto-generated |
| username | String | No | Unique username for login |
| email | String | No | Unique email address |
| passwordHash | String | No | Bcrypt hashed password |
| fullName | String | No | User's full display name |
| role | String | No | User role (default: "accountant") |
| status | String | No | Account status (default: "active") |
| lastLogin | DateTime | Yes | Timestamp of last successful login |
| createdAt | DateTime | No | Account creation timestamp |
| updatedAt | DateTime | No | Last update timestamp |

**Valid Values:**
- `role`: "accountant", "admin", "viewer" (extensible)
- `status`: "active", "inactive", "suspended"

### Expense Model

| Field | Type | Nullable | Description |
|-------|------|----------|-------------|
| id | String (cuid) | No | Primary key, auto-generated |
| expenseType | String | No | Category of expense (e.g., "Utilities") |
| amount | Float | No | Expense amount in INR |
| expenseDate | DateTime | No | Date when expense occurred |
| vendorName | String | No | Name of vendor/payee |
| paymentMethod | String | No | How payment was made |
| billNumber | String | Yes | Reference number from bill/invoice |
| description | String | Yes | Additional notes about expense |
| receiptPath | String | Yes | File path to uploaded receipt |
| createdBy | String (FK) | No | User who created this record |
| vendorId | String (FK) | Yes | Link to Vendor record (optional) |
| createdAt | DateTime | No | Record creation timestamp |
| updatedAt | DateTime | No | Last update timestamp |

**Valid Values:**
- `paymentMethod`: "Cash", "UPI", "Bank Transfer", "Cheque"

### FixedAsset Model

| Field | Type | Nullable | Description |
|-------|------|----------|-------------|
| id | String (cuid) | No | Primary key, auto-generated |
| assetName | String | No | Name/description of asset |
| description | String | Yes | Detailed description |
| location | String | No | Physical location of asset |
| purchaseDate | DateTime | No | Date of acquisition |
| purchaseValue | Float | No | Original purchase price (INR) |
| currentValue | Float | Yes | Current/depreciated value (INR) |
| status | String | No | Current status of asset |
| notes | String | Yes | Additional notes |
| createdBy | String (FK) | No | User who registered this asset |
| createdAt | DateTime | No | Record creation timestamp |
| updatedAt | DateTime | No | Last update timestamp |

**Valid Values:**
- `status`: "active", "under maintenance", "disposed"

### Vendor Model

| Field | Type | Nullable | Description |
|-------|------|----------|-------------|
| id | String (cuid) | No | Primary key, auto-generated |
| name | String | No | Vendor name (unique) |
| contactPerson | String | Yes | Primary contact name |
| phone | String | Yes | Contact phone number |
| email | String | Yes | Contact email |
| address | String | Yes | Vendor address |
| gstNumber | String (15) | Yes | GST registration number |
| notes | String | Yes | Additional notes |
| createdBy | String (FK) | No | User who created vendor |
| createdAt | DateTime | No | Record creation timestamp |
| updatedAt | DateTime | No | Last update timestamp |

**GST Number Format**: `27AABCU9603R1Z5` (15 characters)

### ExpenseType Model

| Field | Type | Nullable | Description |
|-------|------|----------|-------------|
| id | String (cuid) | No | Primary key, auto-generated |
| name | String | No | Expense category name (unique) |
| description | String | Yes | Description of category |
| createdAt | DateTime | No | Record creation timestamp |
| updatedAt | DateTime | No | Last update timestamp |

---

## Migrations

### Creating Migrations

**Development (SQLite):**

```bash
# Create migration after schema changes
npx prisma migrate dev --name add_expense_category

# This will:
# 1. Generate SQL migration file
# 2. Apply migration to dev.db
# 3. Regenerate Prisma Client
```

**Production (PostgreSQL):**

```bash
# Apply pending migrations
npx prisma migrate deploy

# This will:
# 1. Apply all unapplied migrations
# 2. NOT create new migrations (deploy only)
```

### Migration Files

Located in `prisma/migrations/`:

```
prisma/migrations/
├── 20250101120000_init/
│   └── migration.sql
├── 20250110150000_add_vendor_relation/
│   └── migration.sql
└── migration_lock.toml
```

### Example Migration SQL

```sql
-- CreateTable
CREATE TABLE "expenses" (
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
);

-- CreateIndex
CREATE INDEX "expenses_expenseDate_idx" ON "expenses"("expenseDate");
CREATE INDEX "expenses_createdBy_idx" ON "expenses"("createdBy");
```

### Migration Best Practices

1. **Always test migrations locally first**
2. **Backup production database before migration**
3. **Use descriptive migration names**
4. **Never edit existing migration files**
5. **Use `migrate deploy` in production, not `migrate dev`**

---

## Seeding Data

### Seed Script Location

`prisma/seed.ts`

### Running Seeds

```bash
# Run seed script
npm run db:seed

# Or directly
npx prisma db seed
```

### Seed Data Contents

**Default Admin User:**
- Email: `admin@vds.com`
- Password: `admin123` (hashed)
- Role: `accountant`
- Status: `active`

**Sample Expenses:**
- 3 sample expenses with different types
- Linked to admin user

**Sample Expense Types:**
- Light (Electricity)
- Wages (Employee salaries)
- Maintenance (Repairs)

### Custom Seed Script

```typescript
// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const passwordHash = await bcrypt.hash('admin123', 10);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@vds.com' },
    update: {},
    create: {
      username: 'admin',
      email: 'admin@vds.com',
      passwordHash,
      fullName: 'Admin User',
      role: 'accountant',
      status: 'active',
    },
  });

  // Create expense types
  await prisma.expenseType.createMany({
    data: [
      { name: 'Utilities', description: 'Electricity, water, gas' },
      { name: 'Wages', description: 'Employee salaries' },
      { name: 'Office Supplies', description: 'Stationery, equipment' },
    ],
    skipDuplicates: true,
  });

  // Create sample vendor
  const vendor = await prisma.vendor.create({
    data: {
      name: 'Power Company',
      contactPerson: 'John Doe',
      phone: '+91-9876543210',
      gstNumber: '27AABCU9603R1Z5',
      createdBy: admin.id,
    },
  });

  // Create sample expense
  await prisma.expense.create({
    data: {
      expenseType: 'Utilities',
      amount: 5000,
      expenseDate: new Date(),
      vendorName: 'Power Company',
      paymentMethod: 'Bank Transfer',
      billNumber: 'BILL-001',
      description: 'Monthly electricity bill',
      createdBy: admin.id,
      vendorId: vendor.id,
    },
  });

  console.log('✅ Database seeded successfully');
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

---

## Querying Patterns

### Basic CRUD Operations

**Create:**
```typescript
const expense = await prisma.expense.create({
  data: {
    expenseType: 'Utilities',
    amount: 5000,
    expenseDate: new Date(),
    vendorName: 'Power Company',
    paymentMethod: 'Cash',
    createdBy: userId,
  },
});
```

**Read (Single):**
```typescript
const expense = await prisma.expense.findUnique({
  where: { id: expenseId },
  include: { user: true, vendor: true },
});
```

**Read (Multiple):**
```typescript
const expenses = await prisma.expense.findMany({
  where: {
    expenseDate: { gte: startDate, lte: endDate },
    expenseType: 'Utilities',
  },
  include: { user: true, vendor: true },
  orderBy: { expenseDate: 'desc' },
  take: 50, // Limit to 50 records
  skip: 0,  // Pagination offset
});
```

**Update:**
```typescript
const updated = await prisma.expense.update({
  where: { id: expenseId },
  data: { amount: 5500, description: 'Updated amount' },
});
```

**Delete:**
```typescript
await prisma.expense.delete({
  where: { id: expenseId },
});
```

### Advanced Queries

**Aggregations:**
```typescript
// Total expenses by type
const totals = await prisma.expense.groupBy({
  by: ['expenseType'],
  _sum: { amount: true },
  _count: true,
  where: {
    expenseDate: { gte: new Date('2025-01-01') },
  },
});

// Result: [{ expenseType: 'Utilities', _sum: { amount: 15000 }, _count: 5 }]
```

**Count:**
```typescript
const count = await prisma.expense.count({
  where: { expenseType: 'Utilities' },
});
```

**Exists Check:**
```typescript
const exists = await prisma.vendor.findUnique({
  where: { name: 'Power Company' },
  select: { id: true },
});

if (exists) {
  // Vendor exists
}
```

**Transactions:**
```typescript
await prisma.$transaction(async (tx) => {
  // Create vendor
  const vendor = await tx.vendor.create({
    data: { name: 'New Vendor', createdBy: userId },
  });

  // Create expense with vendor
  await tx.expense.create({
    data: {
      expenseType: 'Utilities',
      amount: 1000,
      expenseDate: new Date(),
      vendorName: vendor.name,
      paymentMethod: 'Cash',
      createdBy: userId,
      vendorId: vendor.id,
    },
  });
});
```

**Raw SQL (when needed):**
```typescript
const result = await prisma.$queryRaw`
  SELECT "expenseType", SUM(amount) as total
  FROM expenses
  WHERE "expenseDate" >= ${startDate}
  GROUP BY "expenseType"
  ORDER BY total DESC
`;
```

---

## Performance Optimization

### Indexes

**Existing Indexes:**

```prisma
model Expense {
  @@index([expenseDate])    // Date range queries
  @@index([createdBy])       // User's expenses
  @@index([vendorId])        // Vendor's expenses
  @@index([expenseType])     // Category filtering
  @@index([createdAt])       // Chronological sorting
}
```

**Query Explanation:**

```typescript
// This query will use the expenseDate index
const expenses = await prisma.expense.findMany({
  where: { expenseDate: { gte: startDate } },
});

// This query will use the createdBy index
const myExpenses = await prisma.expense.findMany({
  where: { createdBy: userId },
});
```

### Connection Pooling

**Development:**
```env
DATABASE_URL="file:./dev.db"
```

**Production:**
```env
DATABASE_URL="postgresql://user:pass@host:5432/db?connection_limit=20&pool_timeout=30"
```

**Parameters:**
- `connection_limit`: Max concurrent connections (20-50 recommended)
- `pool_timeout`: Seconds to wait for connection (20-60)

### Query Optimization Tips

1. **Select Only Needed Fields:**
   ```typescript
   // ❌ Bad - Fetches all fields
   const users = await prisma.user.findMany();

   // ✅ Good - Fetches only needed fields
   const users = await prisma.user.findMany({
     select: { id: true, fullName: true, email: true },
   });
   ```

2. **Use Pagination:**
   ```typescript
   const expenses = await prisma.expense.findMany({
     take: 50,
     skip: page * 50,
   });
   ```

3. **Avoid N+1 Queries:**
   ```typescript
   // ❌ Bad - N+1 queries
   const expenses = await prisma.expense.findMany();
   for (const expense of expenses) {
     const user = await prisma.user.findUnique({ where: { id: expense.createdBy } });
   }

   // ✅ Good - Single query with include
   const expenses = await prisma.expense.findMany({
     include: { user: true },
   });
   ```

---

## Backup & Recovery

### Automated Backups (Managed Services)

**Supabase:**
- Daily automated backups
- Point-in-time recovery (PITR)
- 7-day retention (free tier)

**Neon:**
- Continuous backups
- Branch database for testing

**AWS RDS:**
- Automated daily snapshots
- Configurable retention (1-35 days)
- Manual snapshots on demand

### Manual Backups

**Export (SQLite):**
```bash
sqlite3 prisma/dev.db .dump > backup_$(date +%Y%m%d).sql
```

**Export (PostgreSQL):**
```bash
pg_dump $DATABASE_URL > backup_$(date +%Y%m%d).sql
```

**Restore (PostgreSQL):**
```bash
psql $DATABASE_URL < backup_20250115.sql
```

### Backup Best Practices

1. **Schedule Daily Backups**: Use cron jobs or managed service features
2. **Test Restores**: Periodically verify backups can be restored
3. **Multiple Locations**: Store backups in different locations (S3, local, etc.)
4. **Retention Policy**: Keep daily for 7 days, weekly for 1 month
5. **Before Migrations**: Always backup before running migrations

---

## Common Operations

### Migrating from SQLite to PostgreSQL

**Step 1: Export Data**
```bash
# Export SQLite to SQL
sqlite3 prisma/dev.db .dump > data_export.sql
```

**Step 2: Update Schema**
```prisma
datasource db {
  provider = "postgresql"  // Changed from sqlite
  url      = env("DATABASE_URL")
}
```

**Step 3: Create PostgreSQL Database**
```bash
createdb vds_erp_prod
```

**Step 4: Apply Schema**
```bash
export DATABASE_URL="postgresql://user:pass@localhost:5432/vds_erp_prod"
npx prisma db push
```

**Step 5: Import Data**
```bash
# Manually insert data or use Prisma seeding
```

### Resetting Database

**Development:**
```bash
# WARNING: Deletes all data
npx prisma migrate reset

# This will:
# 1. Drop database
# 2. Recreate database
# 3. Apply all migrations
# 4. Run seed script
```

### Viewing Database

**Prisma Studio:**
```bash
npm run db:studio
# Opens GUI at http://localhost:5555
```

**PostgreSQL CLI:**
```bash
psql $DATABASE_URL

\dt              # List tables
\d expenses      # Describe table
SELECT * FROM expenses LIMIT 10;
```

### Database Statistics

```typescript
// Get table counts
const userCount = await prisma.user.count();
const expenseCount = await prisma.expense.count();
const vendorCount = await prisma.vendor.count();
const assetCount = await prisma.fixedAsset.count();

console.log({ userCount, expenseCount, vendorCount, assetCount });
```

---

## Troubleshooting

### Common Issues

#### 1. "P2002: Unique constraint failed"

**Cause:** Trying to insert duplicate value in unique field

**Solution:**
```typescript
// Use upsert instead of create
const vendor = await prisma.vendor.upsert({
  where: { name: 'Power Company' },
  update: { phone: '+91-1234567890' },
  create: { name: 'Power Company', phone: '+91-1234567890', createdBy: userId },
});
```

#### 2. "P2025: Record not found"

**Cause:** Trying to update/delete non-existent record

**Solution:**
```typescript
// Check existence first
const expense = await prisma.expense.findUnique({ where: { id } });
if (!expense) {
  throw new Error('Expense not found');
}
await prisma.expense.delete({ where: { id } });
```

#### 3. "Connection pool timeout"

**Cause:** Too many concurrent database connections

**Solution:**
```env
# Increase connection limit
DATABASE_URL="postgresql://...?connection_limit=50&pool_timeout=60"
```

#### 4. "Prisma Client out of sync"

**Cause:** Schema changed but client not regenerated

**Solution:**
```bash
npx prisma generate
```

---

## Performance Metrics

### Target Performance

| Operation | Target Time | Notes |
|-----------|-------------|-------|
| Single record query | < 10ms | With index |
| List query (50 records) | < 50ms | With includes |
| Aggregation query | < 100ms | Complex groupBy |
| Insert operation | < 20ms | Single record |
| Transaction (2-3 ops) | < 50ms | Atomic operations |

### Monitoring Queries

Enable query logging:

```typescript
// lib/db.ts
const prisma = new PrismaClient({
  log: [
    { emit: 'event', level: 'query' },
    { emit: 'stdout', level: 'error' },
  ],
});

prisma.$on('query', (e) => {
  console.log('Query: ' + e.query);
  console.log('Duration: ' + e.duration + 'ms');
});
```

---

## Future Enhancements

### Planned Schema Changes (Phase 2)

1. **Income Tracking**
   ```prisma
   model Income {
     id          String   @id @default(cuid())
     amount      Float
     date        DateTime
     source      String
     description String?
     createdBy   String
     user        User     @relation(fields: [createdBy], references: [id])
     createdAt   DateTime @default(now())
     updatedAt   DateTime @updatedAt
   }
   ```

2. **Budget Management**
   ```prisma
   model Budget {
     id           String   @id @default(cuid())
     category     String
     monthlyLimit Float
     year         Int
     month        Int
     createdAt    DateTime @default(now())
     updatedAt    DateTime @updatedAt
   }
   ```

3. **Audit Logs**
   ```prisma
   model AuditLog {
     id        String   @id @default(cuid())
     userId    String
     action    String   // CREATE, UPDATE, DELETE
     entity    String   // Expense, Vendor, etc.
     entityId  String
     changes   Json
     createdAt DateTime @default(now())
   }
   ```

---

## Conclusion

This database schema provides a solid foundation for VDS ERP with:

- **Normalized Structure**: Eliminates data redundancy
- **Referential Integrity**: Foreign keys with appropriate cascades
- **Audit Trail**: Timestamps and user attribution
- **Scalability**: Indexed queries for performance
- **Flexibility**: Easy to extend with new models

For questions or schema change requests, open a GitHub issue with the `database` label.

---

**Last Updated:** January 2025