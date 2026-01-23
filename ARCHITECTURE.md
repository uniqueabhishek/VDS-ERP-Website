# System Architecture Documentation

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Technology Stack](#technology-stack)
3. [Application Layers](#application-layers)
4. [Design Patterns](#design-patterns)
5. [Data Flow](#data-flow)
6. [Authentication & Authorization](#authentication--authorization)
7. [State Management](#state-management)
8. [Error Handling](#error-handling)
9. [Performance Optimizations](#performance-optimizations)
10. [Security Considerations](#security-considerations)
11. [Scalability](#scalability)

---

## Architecture Overview

VDS ERP follows a **modern full-stack monolithic architecture** using Next.js 16's App Router, combining frontend and backend in a single deployable unit with clear separation of concerns.

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     Client Browser                       │
│                   (React 19 + Next.js)                   │
└────────────────────┬────────────────────────────────────┘
                     │ HTTP/HTTPS
                     │ (REST API + Server Components)
┌────────────────────▼────────────────────────────────────┐
│                   Next.js Server                         │
│  ┌──────────────────────────────────────────────────┐  │
│  │  App Router (Pages & Layouts)                     │  │
│  │  - Server Components (RSC)                        │  │
│  │  - Client Components (Interactive UI)             │  │
│  └──────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────┐  │
│  │  API Routes (REST Endpoints)                      │  │
│  │  - /api/expenses, /api/vendors, etc.              │  │
│  │  - Route Handlers with validation                 │  │
│  └──────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────┐  │
│  │  Business Logic Layer                             │  │
│  │  - Zod validation schemas                         │  │
│  │  - Authentication (NextAuth.js)                   │  │
│  │  - Authorization middleware                       │  │
│  └──────────────────────────────────────────────────┘  │
└────────────────────┬────────────────────────────────────┘
                     │ Prisma ORM
                     │
┌────────────────────▼────────────────────────────────────┐
│                   Database Layer                         │
│  - SQLite (Development)                                  │
│  - PostgreSQL (Production-ready)                         │
│  - Prisma migrations & seeding                           │
└──────────────────────────────────────────────────────────┘
```

### Architectural Principles

1. **Separation of Concerns**: Clear boundaries between UI, API, business logic, and data layers
2. **Type Safety**: End-to-end TypeScript with Zod runtime validation
3. **Progressive Enhancement**: Server-first rendering with client-side interactivity
4. **API-First Design**: All data operations go through REST endpoints
5. **Security by Default**: Authentication on all protected routes, input validation everywhere

---

## Technology Stack

### Frontend Layer

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 16.1.4 | Framework for React with SSR/SSG/ISR |
| React | 19.2.3 | UI component library |
| TypeScript | 5.0 | Static type checking |
| Tailwind CSS | 4.1.18 | Utility-first CSS framework |
| Zod | 4.3.5 | Schema validation |

**Key Frontend Patterns:**
- Server Components for data fetching (zero JS to client)
- Client Components for interactivity (marked with `'use client'`)
- Streaming and Suspense for progressive loading
- Form validation with Zod before API submission

### Backend Layer

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js API Routes | 16.1.4 | REST API endpoints |
| NextAuth.js | 4.24.13 | Authentication |
| Prisma | 6.19.2 | Database ORM |
| bcryptjs | 3.0.3 | Password hashing |

**Key Backend Patterns:**
- Route Handlers for RESTful operations
- Prisma Client for type-safe database queries
- JWT-based session management
- Middleware for request interception

### Database Layer

| Technology | Environment | Purpose |
|------------|-------------|---------|
| SQLite | Development | Lightweight file-based DB |
| PostgreSQL | Production | Scalable relational database |
| Prisma Migrate | All | Version-controlled schema changes |

---

## Application Layers

### 1. Presentation Layer (`app/` directory)

**Responsibilities:**
- Rendering UI components
- Handling user interactions
- Client-side routing
- Form validation feedback

**Key Components:**

```typescript
// Server Component (default)
// app/accountant/dashboard/page.tsx
export default async function DashboardPage() {
  // Fetch data directly on server
  const stats = await fetchDashboardStats();
  return <DashboardView stats={stats} />;
}

// Client Component (interactive)
// app/components/accountant/ExpenseForm.tsx
'use client';
export function ExpenseForm() {
  const [data, setData] = useState({});
  // Handle form submission, client-side validation
}
```

**File Structure:**
```
app/
├── (routes)/
│   ├── accountant/           # Feature modules
│   │   ├── dashboard/        # Dashboard feature
│   │   ├── expenses/         # Expenses feature
│   │   └── layout.tsx        # Shared layout with sidebar
│   └── login/                # Public authentication
├── components/               # Reusable components
│   ├── accountant/           # Domain-specific
│   └── ui/                   # Generic UI (Button, Toast, etc.)
└── globals.css               # Global styles
```

### 2. API Layer (`app/api/` directory)

**Responsibilities:**
- Exposing REST endpoints
- Request validation
- Session authentication
- Response formatting

**Standard Route Handler Pattern:**

```typescript
// app/api/expenses/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { expenseSchema } from '@/lib/validations';

// GET /api/expenses
export async function GET(request: NextRequest) {
  try {
    // 1. Authenticate
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 2. Parse query parameters
    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get('startDate');

    // 3. Query database
    const expenses = await prisma.expense.findMany({
      where: startDate ? { expenseDate: { gte: new Date(startDate) } } : {},
      include: { user: true, vendor: true },
      orderBy: { expenseDate: 'desc' },
    });

    // 4. Return response
    return NextResponse.json({ expenses });
  } catch (error) {
    console.error('Error fetching expenses:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST /api/expenses
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Validate input with Zod
    const body = await request.json();
    const validated = expenseSchema.parse(body);

    // Create expense
    const expense = await prisma.expense.create({
      data: {
        ...validated,
        createdBy: session.user.id,
      },
    });

    return NextResponse.json({ expense }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
```

### 3. Business Logic Layer (`lib/` directory)

**Responsibilities:**
- Authentication configuration
- Data validation schemas
- Database client initialization
- Utility functions

**Key Files:**

**lib/auth.ts** - NextAuth.js configuration
```typescript
export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        // Validate credentials
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || user.status !== 'active') return null;

        const valid = await bcrypt.compare(
          credentials.password,
          user.passwordHash
        );

        if (!valid) return null;

        return { id: user.id, email: user.email, role: user.role };
      },
    }),
  ],
  session: { strategy: 'jwt' },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    session: async ({ session, token }) => {
      session.user.id = token.id;
      session.user.role = token.role;
      return session;
    },
  },
};
```

**lib/validations.ts** - Zod schemas
```typescript
import { z } from 'zod';

export const expenseSchema = z.object({
  expenseType: z.string().min(1, 'Expense type is required'),
  amount: z.number().positive('Amount must be positive'),
  expenseDate: z.date(),
  vendorName: z.string().min(1, 'Vendor name is required'),
  paymentMethod: z.enum(['Cash', 'UPI', 'Bank Transfer', 'Cheque']),
  billNumber: z.string().optional(),
  description: z.string().optional(),
  receiptPath: z.string().optional(),
  vendorId: z.string().optional(),
});

export type ExpenseInput = z.infer<typeof expenseSchema>;
```

**lib/db.ts** - Prisma Client singleton
```typescript
import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
```

### 4. Data Layer (Prisma)

**Responsibilities:**
- Database schema definition
- Type-safe queries
- Migrations
- Seeding

**Schema Design Principles:**
- Normalized data (3NF)
- Foreign keys with appropriate cascade rules
- Timestamps on all entities (createdAt, updatedAt)
- User attribution (createdBy field)
- Soft deletes where appropriate

---

## Design Patterns

### 1. Repository Pattern (Implicit via Prisma)

Prisma acts as a repository layer, abstracting database operations:

```typescript
// Instead of raw SQL
const expenses = await prisma.expense.findMany({
  where: { createdBy: userId },
  include: { vendor: true },
});
```

### 2. Validation Pattern (Zod)

Input validation at API boundaries:

```typescript
// Define schema once
const schema = z.object({ name: z.string() });

// Use everywhere
const validated = schema.parse(input); // Throws if invalid
const safe = schema.safeParse(input);  // Returns { success, data, error }
```

### 3. Dependency Injection (Implicit via Modules)

Shared instances through ES6 modules:

```typescript
// lib/db.ts exports singleton
export const prisma = new PrismaClient();

// Imported everywhere
import { prisma } from '@/lib/db';
```

### 4. Factory Pattern (Component Composition)

Reusable UI components with variants:

```typescript
<Button variant="primary" size="lg">Submit</Button>
<Button variant="outline" size="sm">Cancel</Button>
```

### 5. Provider Pattern (React Context)

Global state management:

```typescript
// Toast notification system
<ToastProvider>
  <App />
</ToastProvider>

// Usage
const { showToast } = useToast();
showToast('Expense created!', 'success');
```

### 6. Middleware Pattern

Request interception for authentication:

```typescript
// middleware.ts
export function middleware(request: NextRequest) {
  const token = await getToken({ req: request });

  if (!token && request.nextUrl.pathname.startsWith('/accountant')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
}
```

---

## Data Flow

### Create Expense Flow

```
1. User fills ExpenseForm (Client Component)
   ↓
2. Client-side validation with Zod schema
   ↓
3. POST /api/expenses with JSON payload
   ↓
4. API Route Handler:
   - Authenticates session
   - Validates with Zod (server-side)
   - Calls prisma.expense.create()
   ↓
5. Database writes record
   ↓
6. API returns JSON response
   ↓
7. Client updates UI + shows toast
   ↓
8. Optional: Revalidate cache/refetch list
```

### Server Component Data Fetching

```
1. User navigates to /accountant/dashboard
   ↓
2. Next.js renders Server Component on server
   ↓
3. Server Component calls API or Prisma directly
   ↓
4. Data fetched and serialized to HTML
   ↓
5. HTML + minimal JS sent to browser
   ↓
6. React hydrates interactive components only
```

---

## Authentication & Authorization

### Authentication Flow (NextAuth.js)

```
┌─────────┐                                 ┌──────────┐
│ Browser │                                 │  Server  │
└────┬────┘                                 └────┬─────┘
     │                                           │
     │  1. POST /api/auth/signin                │
     │     (email, password)                    │
     ├──────────────────────────────────────────>
     │                                           │
     │                              2. Validate credentials
     │                                 (bcrypt compare)
     │                                           │
     │  3. Set-Cookie: next-auth.session-token  │
     │     (JWT with user id, role, email)      │
     <──────────────────────────────────────────┤
     │                                           │
     │  4. Redirect to /accountant/dashboard    │
     <──────────────────────────────────────────┤
     │                                           │
     │  5. All requests include cookie          │
     ├──────────────────────────────────────────>
     │                                           │
     │                              6. Verify JWT signature
     │                                 Extract user from token
     │                                           │
```

### Authorization Layers

**1. Middleware (Route Protection)**
```typescript
// middleware.ts
if (!token && isProtectedRoute) {
  return redirect('/login');
}
```

**2. API Route Authentication**
```typescript
const session = await getServerSession(authOptions);
if (!session) {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}
```

**3. Role-Based Access (Future Enhancement)**
```typescript
if (session.user.role !== 'admin' && requestingAdminResource) {
  return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
}
```

---

## State Management

### Approach: Minimal Client State

**Server State (Database) → API → React State**

**1. Server Components (No Client State)**
```typescript
// Fetch directly, no useState needed
async function DashboardPage() {
  const expenses = await prisma.expense.findMany();
  return <ExpenseList expenses={expenses} />;
}
```

**2. Client Components (Local State Only)**
```typescript
'use client';
function ExpenseForm() {
  const [formData, setFormData] = useState({});  // Form state only
  const [loading, setLoading] = useState(false);  // UI state

  async function handleSubmit() {
    await fetch('/api/expenses', { method: 'POST', body: JSON.stringify(formData) });
    // Trigger revalidation or refetch
  }
}
```

**3. Global State (React Context)**
```typescript
// Only for truly global UI state
<ToastProvider>    {/* Toast notifications */}
<ThemeProvider>    {/* Dark mode */}
```

**No Redux/Zustand/Jotai** - Server Components eliminate most client state needs.

---

## Error Handling

### Error Handling Strategy

**1. Client-Side Validation**
```typescript
const result = schema.safeParse(formData);
if (!result.success) {
  showToast(result.error.errors[0].message, 'error');
  return;
}
```

**2. API Error Responses**
```typescript
try {
  // Business logic
} catch (error) {
  if (error instanceof z.ZodError) {
    return NextResponse.json({ error: error.errors }, { status: 400 });
  }
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === 'P2002') {
      return NextResponse.json({ error: 'Duplicate entry' }, { status: 409 });
    }
  }
  console.error('Unhandled error:', error);
  return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
}
```

**3. React Error Boundaries**
```typescript
// app/components/ui/ErrorBoundary.tsx
class ErrorBoundary extends React.Component {
  componentDidCatch(error, errorInfo) {
    console.error('React error:', error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return <ErrorFallback />;
    }
    return this.props.children;
  }
}
```

**4. Toast Notifications**
```typescript
const { showToast } = useToast();

try {
  await createExpense(data);
  showToast('Expense created successfully!', 'success');
} catch (error) {
  showToast(error.message || 'Failed to create expense', 'error');
}
```

---

## Performance Optimizations

### 1. Server Components (Zero JS for Static Content)

```typescript
// No JavaScript shipped to client for this component
async function ExpenseList() {
  const expenses = await prisma.expense.findMany();
  return <table>...</table>;
}
```

### 2. Dynamic Imports (Code Splitting)

```typescript
const HeavyChart = dynamic(() => import('./HeavyChart'), {
  loading: () => <Skeleton />,
  ssr: false, // Don't render on server if not needed
});
```

### 3. Image Optimization

```typescript
import Image from 'next/image';

<Image
  src="/images/logo.png"
  width={200}
  height={100}
  alt="VDS Logo"
  priority  // LCP image
/>
```

### 4. Database Query Optimization

```typescript
// Select only needed fields
const users = await prisma.user.findMany({
  select: { id: true, name: true },  // Don't select passwordHash
});

// Use indexes (defined in schema)
@@index([expenseDate])
@@index([createdBy])
```

### 5. Turbopack Configuration

```javascript
// next.config.mjs
export default {
  experimental: {
    turbo: {
      memoryLimit: 4096,  // 4GB for large projects
    },
  },
};
```

### 6. Caching Strategy (Future Enhancement)

```typescript
// Revalidate on-demand
import { revalidatePath } from 'next/cache';
revalidatePath('/accountant/expenses');

// Time-based revalidation
export const revalidate = 60; // 60 seconds
```

---

## Security Considerations

### 1. Authentication Security

✅ **Implemented:**
- Password hashing with bcryptjs (10 rounds)
- JWT tokens with secure secrets (NEXTAUTH_SECRET)
- HTTP-only cookies for session tokens
- CSRF protection (NextAuth.js default)

⚠️ **Recommendations:**
- Implement password complexity requirements
- Add rate limiting on login endpoint
- Enable 2FA for admin accounts

### 2. Authorization

✅ **Implemented:**
- Session verification on all API routes
- User attribution on created records

⚠️ **Recommendations:**
- Implement granular RBAC (admin, accountant, viewer)
- Add resource ownership checks (users can only edit their own data)

### 3. Input Validation

✅ **Implemented:**
- Zod schemas on all API inputs
- Type safety with TypeScript
- SQL injection prevention (Prisma parameterized queries)

### 4. Data Security

✅ **Implemented:**
- No password in API responses (Prisma select excludes passwordHash)
- HTTPS enforcement in production (via Vercel/hosting)

⚠️ **Recommendations:**
- Encrypt sensitive data at rest (PII, GST numbers)
- Implement audit logging for all modifications
- Add file upload virus scanning

### 5. Frontend Security

✅ **Implemented:**
- XSS prevention (React escapes by default)
- Content Security Policy headers (Next.js defaults)

---

## Scalability

### Current Architecture (MVP)

**Suitable for:**
- Up to 10,000 expenses/month
- 50 concurrent users
- Single-server deployment

**Bottlenecks:**
- SQLite (file locking, no concurrent writes)
- Single Next.js server instance

### Scaling Path

**Phase 1: Database Migration**
```
SQLite → PostgreSQL (AWS RDS, Supabase, Neon)
- Connection pooling (PgBouncer)
- Read replicas for analytics
```

**Phase 2: Horizontal Scaling**
```
Single Next.js → Multiple instances behind load balancer
- Vercel auto-scaling
- AWS ECS with ALB
- Kubernetes cluster
```

**Phase 3: Caching Layer**
```
Add Redis for:
- Session storage (faster than DB lookups)
- Frequently accessed data (dashboard stats)
- Rate limiting counters
```

**Phase 4: Microservices (if needed)**
```
Monolith → Separate services
- Authentication service
- Expense service
- Reporting service
- File storage service (S3/Cloudflare R2)
```

### Database Indexing Strategy

```prisma
model Expense {
  // Indexes for common queries
  @@index([expenseDate])       // Date-range queries
  @@index([createdBy])          // User's expenses
  @@index([vendorId])           // Vendor's expenses
  @@index([expenseType])        // Category filtering
  @@index([createdAt])          // Audit trail chronological
}
```

---

## Technology Decision Rationale

### Why Next.js App Router?

✅ **Pros:**
- Server Components reduce client JS bundle
- Built-in API routes (no separate backend)
- Excellent TypeScript support
- Vercel deployment optimizations
- File-based routing (intuitive)

❌ **Cons:**
- Steeper learning curve (RSC paradigm)
- Less mature than Pages Router (but stable now)

### Why Prisma ORM?

✅ **Pros:**
- Type-safe queries (auto-generated types)
- Excellent migration tooling
- Visual database browser (Prisma Studio)
- Works with multiple databases

❌ **Cons:**
- Adds abstraction layer (can't write raw SQL easily)
- Larger bundle size

### Why NextAuth.js?

✅ **Pros:**
- Deep Next.js integration
- Supports many providers (OAuth ready for future)
- Active community

❌ **Cons:**
- Complex configuration for advanced use cases
- JWT size can grow with custom claims

---

## Future Architecture Considerations

### Event-Driven Architecture

```typescript
// Emit events instead of direct operations
eventBus.emit('expense.created', { expenseId: '123' });

// Listeners handle side effects
eventBus.on('expense.created', async (data) => {
  await sendNotificationToAdmin(data.expenseId);
  await updateBudgetStats();
});
```

### CQRS (Command Query Responsibility Segregation)

```typescript
// Write model (commands)
class CreateExpenseCommand { ... }

// Read model (queries)
class GetExpensesQuery { ... }

// Separate databases for reads and writes
```

### GraphQL API (Alternative to REST)

```typescript
// Single endpoint, client specifies fields
query {
  expenses(startDate: "2025-01-01") {
    id
    amount
    vendor { name }  // Nested fetch
  }
}
```

---

## Conclusion

The VDS ERP architecture prioritizes:

1. **Developer Experience**: TypeScript + modern tooling
2. **Performance**: Server Components, optimized builds
3. **Security**: Authentication, validation, type safety
4. **Maintainability**: Clear separation of concerns, documented patterns
5. **Scalability**: Database-agnostic design, horizontal scaling ready

This foundation supports the current MVP and provides a clear path for future enhancements.