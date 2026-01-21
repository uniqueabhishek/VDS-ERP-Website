# VDS ERP System - MVP Phase 1 (Next.js)

## Document Information
- **Project:** VDS ERP System
- **Phase:** MVP Phase 1
- **Framework:** Next.js 14+ (App Router)
- **Date:** January 2026
- **Version:** 1.0

---

## 1. Technology Stack

### Frontend
- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **Icons:** Lucide React
- **Forms:** React Hook Form + Zod (validation)
- **State Management:** React Context API / Zustand

### Backend (Next.js API Routes)
- **API:** Next.js Route Handlers (App Router)
- **Authentication:** NextAuth.js (Auth.js)
- **Database ORM:** Prisma
- **Database:** PostgreSQL (or SQLite for local dev)

### Dev Tools
- **Package Manager:** npm / pnpm / yarn
- **Code Quality:** ESLint, Prettier
- **Version Control:** Git

---

## 2. Project Structure

```
vds-erp/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   │   └── page.tsx
│   │   └── layout.tsx
│   ├── (dashboard)/
│   │   ├── dashboard/
│   │   │   └── page.tsx
│   │   ├── fixed-assets/
│   │   │   ├── page.tsx
│   │   │   ├── new/
│   │   │   │   └── page.tsx
│   │   │   └── [id]/
│   │   │       └── page.tsx
│   │   ├── expenses/
│   │   │   ├── page.tsx
│   │   │   └── new/
│   │   │       └── page.tsx
│   │   └── layout.tsx
│   ├── api/
│   │   ├── auth/
│   │   │   └── [...nextauth]/
│   │   │       └── route.ts
│   │   ├── fixed-assets/
│   │   │   ├── route.ts
│   │   │   └── [id]/
│   │   │       └── route.ts
│   │   └── expenses/
│   │       ├── route.ts
│   │       └── [id]/
│   │           └── route.ts
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ui/
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── card.tsx
│   │   ├── table.tsx
│   │   └── ... (shadcn components)
│   ├── auth/
│   │   └── login-form.tsx
│   ├── dashboard/
│   │   ├── stats-card.tsx
│   │   └── recent-activity.tsx
│   ├── fixed-assets/
│   │   ├── assets-table.tsx
│   │   └── asset-form.tsx
│   └── expenses/
│       ├── expense-form.tsx
│       └── expenses-table.tsx
├── lib/
│   ├── prisma.ts
│   ├── auth.ts
│   └── utils.ts
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── public/
│   └── images/
├── types/
│   └── index.ts
├── .env.local
├── next.config.js
├── package.json
├── tsconfig.json
└── tailwind.config.ts
```

---

## 3. Features & Pages

### 3.1 Login Page
**Route:** `/login`
**File:** `app/(auth)/login/page.tsx`

**Components:**
- Login form with email/password
- NextAuth.js authentication
- Session management
- Redirect to dashboard on success

**Key Features:**
```typescript
// Using NextAuth credentials provider
- Email/password login
- JWT session tokens
- Protected routes middleware
- Automatic redirect if already logged in
```

---

### 3.2 Dashboard Page
**Route:** `/dashboard`
**File:** `app/(dashboard)/dashboard/page.tsx`

**Components:**
- Header with user info and logout
- Stats cards (server components for data fetching)
- Navigation links
- Recent activity list

**Data Fetching:**
```typescript
// Server Component
async function DashboardPage() {
  const session = await getServerSession()
  const stats = await getExpenseStats()
  const recentExpenses = await getRecentExpenses(5)

  return <Dashboard stats={stats} recent={recentExpenses} />
}
```

---

### 3.3 Fixed Assets Page
**Route:** `/fixed-assets`
**File:** `app/(dashboard)/fixed-assets/page.tsx`

**Features:**
- Server-side data fetching
- Assets table with sorting and filtering
- Search functionality
- Add new asset button → `/fixed-assets/new`

**API Endpoints:**
```typescript
// GET /api/fixed-assets - List all assets
// POST /api/fixed-assets - Create new asset
// GET /api/fixed-assets/[id] - Get single asset
// PUT /api/fixed-assets/[id] - Update asset
// DELETE /api/fixed-assets/[id] - Delete asset
```

---

### 3.4 Add/Edit Fixed Asset Page
**Routes:**
- `/fixed-assets/new` (Add)
- `/fixed-assets/[id]` (Edit)

**Components:**
- Asset form with React Hook Form
- Zod validation schema
- Form submission handling
- Success/error toast notifications

**Form Validation:**
```typescript
const assetSchema = z.object({
  assetName: z.string().min(1, "Asset name is required"),
  location: z.string().min(1, "Location is required"),
  purchaseDate: z.date(),
  purchaseValue: z.number().positive(),
  currentValue: z.number().optional(),
  status: z.enum(["active", "under_maintenance", "inactive"]),
  description: z.string().optional(),
  notes: z.string().optional(),
})
```

---

### 3.5 Expenses Page
**Route:** `/expenses`
**File:** `app/(dashboard)/expenses/page.tsx`

**Features:**
- Expense booking form
- Recent expenses table
- Filter by date range and type
- Export to Excel functionality

**API Endpoints:**
```typescript
// GET /api/expenses - List expenses with filters
// POST /api/expenses - Create new expense
// GET /api/expenses/[id] - Get single expense
// PUT /api/expenses/[id] - Update expense
// DELETE /api/expenses/[id] - Delete expense
```

---

## 4. Database Schema (Prisma)

### 4.1 Prisma Schema
**File:** `prisma/schema.prisma`

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id            String    @id @default(cuid())
  username      String    @unique
  email         String    @unique
  passwordHash  String
  fullName      String
  role          String    @default("accountant")
  status        String    @default("active")
  createdAt     DateTime  @default(now())
  lastLogin     DateTime?

  // Relations
  fixedAssets   FixedAsset[]
  expenses      Expense[]

  @@map("users")
}

model FixedAsset {
  id             String    @id @default(cuid())
  assetName      String
  description    String?
  location       String
  purchaseDate   DateTime
  purchaseValue  Decimal   @db.Decimal(12, 2)
  currentValue   Decimal?  @db.Decimal(12, 2)
  status         String    @default("active")
  notes          String?

  // Relations
  createdBy      String
  user           User      @relation(fields: [createdBy], references: [id])

  createdAt      DateTime  @default(now())
  updatedAt      DateTime  @updatedAt

  @@map("fixed_assets")
}

model Expense {
  id                String    @id @default(cuid())
  expenseType       String
  amount            Decimal   @db.Decimal(10, 2)
  expenseDate       DateTime
  vendorName        String
  paymentMethod     String
  billReceiptNumber String?
  description       String?

  // Relations
  createdBy         String
  user              User      @relation(fields: [createdBy], references: [id])

  createdAt         DateTime  @default(now())
  updatedAt         DateTime  @updatedAt

  @@map("expenses")
}
```

---

## 5. Authentication Setup

### 5.1 NextAuth.js Configuration
**File:** `lib/auth.ts`

```typescript
import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "./prisma"
import bcrypt from "bcryptjs"

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        })

        if (!user) {
          return null
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.passwordHash
        )

        if (!isPasswordValid) {
          return null
        }

        return {
          id: user.id,
          email: user.email,
          name: user.fullName,
          role: user.role,
        }
      }
    })
  ],
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string
      }
      return session
    }
  }
}
```

### 5.2 Middleware for Protected Routes
**File:** `middleware.ts`

```typescript
import { withAuth } from "next-auth/middleware"

export default withAuth({
  callbacks: {
    authorized: ({ token }) => !!token
  },
})

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/fixed-assets/:path*",
    "/expenses/:path*",
  ]
}
```

---

## 6. API Route Examples

### 6.1 Fixed Assets API
**File:** `app/api/fixed-assets/route.ts`

```typescript
import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

// GET - List all fixed assets
export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const assets = await prisma.fixedAsset.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      user: {
        select: { fullName: true }
      }
    }
  })

  return NextResponse.json(assets)
}

// POST - Create new fixed asset
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await req.json()

  const asset = await prisma.fixedAsset.create({
    data: {
      ...body,
      createdBy: session.user.id,
    }
  })

  return NextResponse.json(asset, { status: 201 })
}
```

### 6.2 Expenses API
**File:** `app/api/expenses/route.ts`

```typescript
import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

// GET - List expenses with filters
export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { searchParams } = new URL(req.url)
  const startDate = searchParams.get("startDate")
  const endDate = searchParams.get("endDate")
  const type = searchParams.get("type")

  const expenses = await prisma.expense.findMany({
    where: {
      ...(startDate && endDate && {
        expenseDate: {
          gte: new Date(startDate),
          lte: new Date(endDate)
        }
      }),
      ...(type && { expenseType: type })
    },
    orderBy: { expenseDate: "desc" },
    take: 20
  })

  return NextResponse.json(expenses)
}

// POST - Create new expense
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await req.json()

  const expense = await prisma.expense.create({
    data: {
      ...body,
      createdBy: session.user.id,
    }
  })

  return NextResponse.json(expense, { status: 201 })
}
```

---

## 7. Setup Instructions

### 7.1 Initial Setup

```bash
# Create Next.js project
npx create-next-app@latest vds-erp --typescript --tailwind --app

# Navigate to project
cd vds-erp

# Install dependencies
npm install prisma @prisma/client
npm install next-auth @auth/prisma-adapter
npm install bcryptjs zod react-hook-form @hookform/resolvers
npm install lucide-react
npm install -D @types/bcryptjs

# Install shadcn/ui
npx shadcn-ui@latest init

# Install shadcn components
npx shadcn-ui@latest add button
npx shadcn-ui@latest add input
npx shadcn-ui@latest add card
npx shadcn-ui@latest add table
npx shadcn-ui@latest add form
npx shadcn-ui@latest add select
npx shadcn-ui@latest add toast
```

### 7.2 Environment Variables
**File:** `.env.local`

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/vds_erp"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"
```

### 7.3 Database Setup

```bash
# Initialize Prisma
npx prisma init

# Create migration
npx prisma migrate dev --name init

# Generate Prisma Client
npx prisma generate

# (Optional) Seed database
npx prisma db seed
```

### 7.4 Run Development Server

```bash
npm run dev
```

Visit: `http://localhost:3000`

---

## 8. Development Checklist

### Setup Phase
- [ ] Create Next.js project
- [ ] Install all dependencies
- [ ] Set up Prisma schema
- [ ] Configure NextAuth.js
- [ ] Create environment variables
- [ ] Initialize database

### Component Development
- [ ] Create UI components (shadcn)
- [ ] Build login form
- [ ] Build dashboard layout
- [ ] Create fixed assets table
- [ ] Create fixed assets form
- [ ] Create expenses form
- [ ] Create expenses table

### API Development
- [ ] Auth API routes
- [ ] Fixed assets CRUD APIs
- [ ] Expenses CRUD APIs
- [ ] Middleware for protection

### Testing
- [ ] Test authentication flow
- [ ] Test fixed assets CRUD
- [ ] Test expenses CRUD
- [ ] Test form validations
- [ ] Test responsive design

### Deployment
- [ ] Set up production database
- [ ] Configure environment variables
- [ ] Deploy to Vercel/other platform
- [ ] Test production build

---

## 9. Deployment Options

### Option 1: Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Option 2: Self-hosted
- Use Docker
- Set up PostgreSQL
- Configure Nginx
- Set up SSL

---

## 10. Future Enhancements (Phase 2)

- [ ] Income tracking module
- [ ] Multiple user roles with permissions
- [ ] Advanced reporting and analytics
- [ ] Excel export functionality
- [ ] Email notifications
- [ ] File upload for receipts
- [ ] Purchase Orders module
- [ ] Work Orders module
- [ ] Mobile responsive improvements
- [ ] Dark mode

---

## 11. Resources

**Next.js Documentation:**
- https://nextjs.org/docs

**Prisma Documentation:**
- https://www.prisma.io/docs

**NextAuth.js Documentation:**
- https://next-auth.js.org

**shadcn/ui Components:**
- https://ui.shadcn.com

**Tailwind CSS:**
- https://tailwindcss.com/docs

---

**End of Document**
