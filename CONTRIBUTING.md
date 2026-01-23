# Contributing to VDS ERP

Thank you for your interest in contributing to VDS ERP! This guide will help you get started with development and ensure consistent code quality across the project.

## Table of Contents

1. [Code of Conduct](#code-of-conduct)
2. [Getting Started](#getting-started)
3. [Development Workflow](#development-workflow)
4. [Coding Standards](#coding-standards)
5. [Commit Guidelines](#commit-guidelines)
6. [Pull Request Process](#pull-request-process)
7. [Testing Guidelines](#testing-guidelines)
8. [Documentation](#documentation)
9. [Project Structure](#project-structure)
10. [Common Tasks](#common-tasks)

---

## Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inclusive environment for all contributors, regardless of experience level, background, or identity.

### Expected Behavior

- Be respectful and considerate
- Accept constructive criticism gracefully
- Focus on what is best for the project
- Show empathy towards other contributors

### Unacceptable Behavior

- Harassment, discrimination, or offensive comments
- Personal attacks or trolling
- Publishing others' private information
- Any conduct inappropriate in a professional setting

---

## Getting Started

### Prerequisites

Ensure you have:

- **Node.js** 18.x or higher
- **npm** 9.x or higher
- **Git** for version control
- **Code Editor** (VS Code recommended)
- **PostgreSQL** (optional for local development)

### Initial Setup

1. **Fork the Repository**

   Click the "Fork" button on GitHub to create your own copy.

2. **Clone Your Fork**

   ```bash
   git clone https://github.com/YOUR_USERNAME/vds-erp-website.git
   cd vds-erp-website
   ```

3. **Add Upstream Remote**

   ```bash
   git remote add upstream https://github.com/ORIGINAL_OWNER/vds-erp-website.git
   ```

4. **Install Dependencies**

   ```bash
   npm install
   ```

5. **Set Up Environment**

   ```bash
   cp .env.example .env
   ```

   Update `.env` with your local configuration.

6. **Initialize Database**

   ```bash
   npm run db:push
   npm run db:seed
   ```

7. **Start Development Server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000)

### Recommended VS Code Extensions

- **ESLint** - Linting
- **Prettier** - Code formatting
- **Prisma** - Schema syntax highlighting
- **Tailwind CSS IntelliSense** - CSS class autocomplete
- **TypeScript Error Translator** - Better error messages

### VS Code Settings

Create `.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.tsdk": "node_modules/typescript/lib",
  "tailwindCSS.experimental.classRegex": [
    ["cva\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"]
  ]
}
```

---

## Development Workflow

### Branch Strategy

We follow **Git Flow** with these branches:

- `main` - Production-ready code
- `develop` - Integration branch for features
- `feature/*` - New features
- `bugfix/*` - Bug fixes
- `hotfix/*` - Urgent production fixes

### Creating a Feature Branch

```bash
# Update your local repository
git checkout develop
git pull upstream develop

# Create feature branch
git checkout -b feature/expense-export

# Make changes, commit, push
git add .
git commit -m "feat: add expense export functionality"
git push origin feature/expense-export
```

### Keeping Your Branch Updated

```bash
# Fetch upstream changes
git fetch upstream

# Rebase your branch
git checkout feature/expense-export
git rebase upstream/develop

# Resolve conflicts if any, then
git push origin feature/expense-export --force-with-lease
```

---

## Coding Standards

### TypeScript

**1. Strict Type Safety**

```typescript
// ✅ Good
function calculateTotal(expenses: Expense[]): number {
  return expenses.reduce((sum, exp) => sum + exp.amount, 0);
}

// ❌ Bad
function calculateTotal(expenses: any): any {
  return expenses.reduce((sum, exp) => sum + exp.amount, 0);
}
```

**2. Explicit Return Types**

```typescript
// ✅ Good
async function fetchExpenses(): Promise<Expense[]> {
  return await prisma.expense.findMany();
}

// ❌ Bad
async function fetchExpenses() {
  return await prisma.expense.findMany();
}
```

**3. Use Type Instead of Interface (Consistency)**

```typescript
// ✅ Good (project convention)
type ExpenseFormData = {
  amount: number;
  date: Date;
};

// ❌ Bad (inconsistent with codebase)
interface ExpenseFormData {
  amount: number;
  date: Date;
}
```

**4. Avoid Enums, Use Const Objects**

```typescript
// ✅ Good
const PaymentMethod = {
  Cash: 'Cash',
  UPI: 'UPI',
  BankTransfer: 'Bank Transfer',
} as const;

type PaymentMethodType = typeof PaymentMethod[keyof typeof PaymentMethod];

// ❌ Bad
enum PaymentMethod {
  Cash = 'Cash',
  UPI = 'UPI',
}
```

### React Components

**1. Server Components by Default**

```typescript
// ✅ Good - Server Component (default)
async function ExpenseList() {
  const expenses = await prisma.expense.findMany();
  return <div>{/* render */}</div>;
}
```

**2. Client Components Only When Needed**

```typescript
// ✅ Good - Client Component for interactivity
'use client';

import { useState } from 'react';

export function ExpenseForm() {
  const [data, setData] = useState({});
  // ...
}
```

**3. Component File Structure**

```typescript
// ComponentName.tsx
'use client'; // Only if needed

import { /* dependencies */ } from '...';

// Types
type ComponentProps = {
  title: string;
};

// Main component
export function ComponentName({ title }: ComponentProps) {
  return <div>{title}</div>;
}

// Sub-components (if small)
function SubComponent() {
  return <div>Sub</div>;
}
```

**4. Props Destructuring**

```typescript
// ✅ Good
function ExpenseCard({ amount, date, vendor }: ExpenseCardProps) {
  return <div>...</div>;
}

// ❌ Bad
function ExpenseCard(props: ExpenseCardProps) {
  return <div>{props.amount}</div>;
}
```

### Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `ExpenseForm`, `DashboardCard` |
| Functions | camelCase | `fetchExpenses`, `calculateTotal` |
| Variables | camelCase | `totalAmount`, `userSession` |
| Constants | UPPER_SNAKE_CASE | `MAX_FILE_SIZE`, `API_BASE_URL` |
| Types/Interfaces | PascalCase | `ExpenseFormData`, `ApiResponse` |
| Files (components) | PascalCase | `ExpenseForm.tsx` |
| Files (utilities) | camelCase | `validations.ts`, `auth.ts` |
| API Routes | kebab-case | `expense-types/route.ts` |

### File Organization

```
app/
├── (routes)/
│   └── accountant/
│       └── expenses/
│           ├── page.tsx              # Route page
│           ├── layout.tsx            # Route layout (if needed)
│           └── components/           # Route-specific components
│               └── ExpenseTable.tsx
├── components/
│   ├── accountant/                   # Feature-specific shared
│   │   └── ExpenseForm.tsx
│   └── ui/                           # Generic reusable
│       └── Button.tsx
└── api/
    └── expenses/
        └── route.ts                  # API route handler
```

### Import Order

```typescript
// 1. React imports
import { useState, useEffect } from 'react';

// 2. Next.js imports
import { useRouter } from 'next/navigation';

// 3. External libraries
import { z } from 'zod';

// 4. Internal modules (@/ alias)
import { prisma } from '@/lib/db';
import { Button } from '@/components/ui/Button';

// 5. Relative imports
import { calculateTotal } from './utils';

// 6. Type imports (separate)
import type { Expense } from '@prisma/client';
```

### Tailwind CSS

**1. Use Consistent Spacing**

```tsx
// ✅ Good - Tailwind spacing scale
<div className="p-4 gap-2 mt-6">

// ❌ Bad - Arbitrary values
<div className="p-[17px] gap-[9px] mt-[23px]">
```

**2. Order Classes Logically**

```tsx
// Layout → Spacing → Typography → Colors → Effects
<div className="flex items-center gap-4 px-6 py-3 text-lg font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
```

**3. Extract Repeated Patterns**

```typescript
// utils/cn.ts
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Usage
<div className={cn(
  "base-classes",
  isActive && "active-classes",
  className
)}>
```

### API Routes

**Standard Pattern:**

```typescript
// app/api/expenses/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { expenseSchema } from '@/lib/validations';
import { z } from 'zod';

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
    });

    // 4. Return response
    return NextResponse.json({ expenses });
  } catch (error) {
    console.error('Error fetching expenses:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Validate with Zod
    const body = await request.json();
    const validated = expenseSchema.parse(body);

    // Create record
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
    console.error('Error creating expense:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

---

## Commit Guidelines

We follow **Conventional Commits** specification.

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

| Type | Description |
|------|-------------|
| `feat` | New feature |
| `fix` | Bug fix |
| `docs` | Documentation changes |
| `style` | Code style changes (formatting, no logic change) |
| `refactor` | Code refactoring (no feature change) |
| `perf` | Performance improvements |
| `test` | Adding or updating tests |
| `chore` | Build process, dependencies, tooling |
| `ci` | CI/CD configuration changes |

### Examples

```bash
feat(expenses): add expense export to CSV

Implemented CSV export functionality for expenses with date range filtering.
Includes headers and properly formatted currency values.

Closes #42

---

fix(auth): resolve session timeout on API routes

Session was expiring prematurely due to incorrect JWT configuration.
Updated NextAuth config to use 30-day session duration.

Fixes #56

---

docs(readme): update installation instructions

Added PostgreSQL setup steps and clarified environment variable configuration.

---

refactor(api): extract validation logic to separate module

Moved all Zod schemas to lib/validations.ts for better reusability.

---

chore(deps): upgrade Next.js to 16.1.5

Updated Next.js and related dependencies to latest stable versions.
```

### Commit Best Practices

- Write commit messages in **imperative mood** ("add" not "added")
- Keep subject line under 72 characters
- Separate subject from body with blank line
- Use body to explain **what** and **why**, not **how**
- Reference issues/PRs in footer

---

## Pull Request Process

### Before Submitting

**1. Run Checks Locally**

```bash
# Type checking
npm run type-check

# Linting
npm run lint

# Build
npm run build

# Tests (if available)
npm test
```

**2. Update Documentation**

- Update relevant `.md` files if needed
- Add JSDoc comments for complex functions
- Update API documentation for new endpoints

**3. Test Thoroughly**

- Test all affected features manually
- Test on different screen sizes (mobile, tablet, desktop)
- Check both light and dark modes
- Verify database operations

### Creating Pull Request

**1. Push Your Branch**

```bash
git push origin feature/expense-export
```

**2. Open PR on GitHub**

- Base: `develop` (not `main`)
- Title: Clear, descriptive (follows commit convention)
- Description: Use the template below

**PR Description Template:**

```markdown
## Description
Brief description of what this PR does.

## Type of Change
- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update

## Related Issues
Closes #42
Relates to #38

## Changes Made
- Added expense export functionality
- Updated ExpenseList component with export button
- Created new API endpoint /api/expenses/export
- Added CSV generation utility

## Screenshots (if applicable)
[Add screenshots here]

## Testing Done
- [ ] Tested expense export with various filters
- [ ] Verified CSV format and data accuracy
- [ ] Tested on Chrome, Firefox, Safari
- [ ] Tested on mobile devices
- [ ] Checked for TypeScript errors
- [ ] Ran linter

## Checklist
- [ ] My code follows the project's coding standards
- [ ] I have performed a self-review of my code
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] I have updated the documentation accordingly
- [ ] My changes generate no new warnings
- [ ] I have added tests that prove my fix is effective or that my feature works
- [ ] New and existing unit tests pass locally with my changes
```

### Review Process

1. **Automated Checks** - CI/CD runs linters, type checks, builds
2. **Code Review** - At least one maintainer reviews
3. **Feedback** - Address review comments
4. **Approval** - Maintainer approves PR
5. **Merge** - Squash and merge to `develop`

### Responding to Feedback

```bash
# Make requested changes
git add .
git commit -m "refactor: address PR feedback"
git push origin feature/expense-export
```

---

## Testing Guidelines

### Manual Testing Checklist

For every change, test:

- [ ] **Functionality** - Feature works as expected
- [ ] **Edge Cases** - Invalid inputs, empty states, errors
- [ ] **Responsiveness** - Mobile, tablet, desktop views
- [ ] **Dark Mode** - Both themes look correct
- [ ] **Performance** - No noticeable lag or slowdowns
- [ ] **Browser Compatibility** - Chrome, Firefox, Safari, Edge
- [ ] **Accessibility** - Keyboard navigation, screen reader labels

### Writing Tests (Future Enhancement)

When testing infrastructure is added:

```typescript
// __tests__/lib/validations.test.ts
import { expenseSchema } from '@/lib/validations';

describe('expenseSchema', () => {
  it('should validate correct expense data', () => {
    const data = {
      expenseType: 'Utilities',
      amount: 5000,
      expenseDate: new Date(),
      vendorName: 'Power Company',
      paymentMethod: 'Cash',
    };

    const result = expenseSchema.safeParse(data);
    expect(result.success).toBe(true);
  });

  it('should reject negative amounts', () => {
    const data = {
      expenseType: 'Utilities',
      amount: -100,
      expenseDate: new Date(),
      vendorName: 'Power Company',
      paymentMethod: 'Cash',
    };

    const result = expenseSchema.safeParse(data);
    expect(result.success).toBe(false);
    expect(result.error?.errors[0].message).toContain('positive');
  });
});
```

---

## Documentation

### Code Comments

**When to Comment:**

- Complex algorithms
- Non-obvious business logic
- Workarounds or hacks
- Important assumptions

**When NOT to Comment:**

- Self-explanatory code
- Repeating what code already says

```typescript
// ✅ Good - Explains WHY
// We use Math.floor instead of toFixed to avoid rounding issues
// with currency calculations per Indian tax regulations
const taxAmount = Math.floor(amount * 0.18);

// ❌ Bad - Explains WHAT (obvious)
// Calculate tax amount
const taxAmount = amount * 0.18;
```

### JSDoc for Functions

```typescript
/**
 * Calculates total expenses for a given date range.
 *
 * @param startDate - Start of the date range (inclusive)
 * @param endDate - End of the date range (inclusive)
 * @param userId - Optional user ID to filter by creator
 * @returns Total amount of expenses in INR
 * @throws {Error} If date range is invalid
 *
 * @example
 * const total = await calculateExpenseTotal(
 *   new Date('2025-01-01'),
 *   new Date('2025-01-31')
 * );
 */
export async function calculateExpenseTotal(
  startDate: Date,
  endDate: Date,
  userId?: string
): Promise<number> {
  // Implementation
}
```

---

## Project Structure

Understanding where to place new code:

```
vds-erp-website/
├── app/
│   ├── (authenticated)/          # Protected routes
│   │   └── accountant/
│   │       ├── dashboard/
│   │       │   ├── page.tsx      # PUT: Dashboard page component
│   │       │   └── components/   # PUT: Dashboard-specific components
│   │       └── layout.tsx        # Shared authenticated layout
│   ├── (public)/                 # Public routes
│   │   └── login/
│   │       └── page.tsx
│   ├── api/                      # PUT: API endpoints
│   │   └── expenses/
│   │       └── route.ts
│   └── components/
│       ├── accountant/           # PUT: Feature-specific shared components
│       └── ui/                   # PUT: Generic reusable components
├── lib/                          # PUT: Business logic, utilities
│   ├── auth.ts                   # Authentication configuration
│   ├── db.ts                     # Database client
│   └── validations.ts            # Zod schemas
├── types/                        # PUT: TypeScript type definitions
│   └── api.ts
├── prisma/                       # PUT: Database schema and migrations
│   ├── schema.prisma
│   └── migrations/
├── public/                       # PUT: Static files
│   └── images/
└── docs/                         # PUT: Additional documentation
```

---

## Common Tasks

### Adding a New API Endpoint

1. Create route file: `app/api/[resource]/route.ts`
2. Implement handlers (GET, POST, PUT, DELETE)
3. Add Zod validation schema to `lib/validations.ts`
4. Update API documentation: `API_DOCUMENTATION.md`
5. Test with Postman or cURL

### Adding a New Database Model

1. Update `prisma/schema.prisma`
2. Create migration: `npx prisma migrate dev --name add_model_name`
3. Generate client: `npx prisma generate`
4. Create API endpoints
5. Update `DATABASE.md`

### Adding a New Page

1. Create page file: `app/[route]/page.tsx`
2. Add navigation link if needed
3. Implement Server Component for data fetching
4. Create Client Components for interactivity
5. Test responsiveness and dark mode

### Updating Styles

1. Use Tailwind utility classes (preferred)
2. For complex styles, create component variants
3. Update `globals.css` only for base styles
4. Test in both light and dark modes

---

## Getting Help

- **Documentation**: Check `README.md`, `ARCHITECTURE.md`, `API_DOCUMENTATION.md`
- **Issues**: Search existing GitHub issues
- **Discussions**: Use GitHub Discussions for questions
- **Code Review**: Tag maintainers in PR comments

---

## Recognition

Contributors will be acknowledged in:

- `CONTRIBUTORS.md` (alphabetical)
- Release notes for significant contributions
- GitHub contributor graph

---

Thank you for contributing to VDS ERP! Your efforts help improve financial management for Vedic Dharma Sansthan.