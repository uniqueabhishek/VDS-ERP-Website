# VDS ERP - Vedic Dharma Sansthan Accounting System

> Enterprise-grade accounting and expense management platform for managing organizational finances, vendors, fixed assets, and operational workflows.

[![Next.js](https://img.shields.io/badge/Next.js-16.1.4-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-6.19.2-2D3748)](https://www.prisma.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.18-38B2AC)](https://tailwindcss.com/)

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [Documentation](#documentation)
- [Default Credentials](#default-credentials)
- [Available Scripts](#available-scripts)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Overview

VDS ERP is a specialized accounting and financial management system designed for Vedic Dharma Sansthan, an organization focused on Vedic culture and service (seva). The platform provides comprehensive tools for:

- **Expense tracking** with receipt management
- **Vendor management** with GST support
- **Fixed asset tracking** with depreciation
- **Budget monitoring** and financial oversight
- **Operational task management**
- **Audit trails** and history tracking

The system is built with modern web technologies, ensuring scalability, security, and an excellent user experience.

## ✨ Features

### 🔐 Authentication & Security
- Secure credential-based authentication via NextAuth.js
- JWT session management with token refresh
- Role-based access control (RBAC)
- User status tracking (active/inactive)
- Last login timestamp recording

### 📊 Dashboard & Analytics
- Real-time financial statistics
- Budget health monitoring by department
- Pending tasks with priority levels
- Quick action buttons for common operations
- Recent activity feed
- Search functionality across vouchers, vendors, and transactions

### 💰 Expense Management
- Create, read, update, delete (CRUD) expense records
- Multiple payment methods (Cash, UPI, Bank Transfer, Cheque)
- Receipt upload and storage
- Expense categorization by type
- Date-range filtering and reporting
- Vendor linkage for expense tracking

### 🏢 Vendor Management
- Complete vendor lifecycle management
- Contact information tracking
- GST number validation (15-character format)
- Expense aggregation per vendor
- Notes and custom fields

### 🏗️ Fixed Asset Tracking
- Asset registration with purchase details
- Depreciation tracking (purchase value vs. current value)
- Location and status management
- Asset lifecycle: Active → Under Maintenance → Disposed
- User attribution for accountability

### 📝 Expense Types
- Customizable expense categories
- Predefined types: Wages, Utilities, Maintenance, Goshala, Office Supplies
- Easy category management

### 🌙 UI/UX
- Fully responsive design (mobile, tablet, desktop)
- Dark mode support throughout
- Material Design 3 icons
- Toast notifications for user feedback
- Loading skeletons for better perceived performance
- Accessible components (ARIA support)

## 🛠️ Technology Stack

### Frontend
- **Framework:** Next.js 16.1.4 (App Router)
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS 4.1.18
- **UI Library:** Custom shadcn-style components
- **Icons:** Material Symbols Outlined
- **Font:** Manrope (Google Fonts)

### Backend
- **Runtime:** Node.js (via Next.js Route Handlers)
- **Authentication:** NextAuth.js 4.24.13
- **Database ORM:** Prisma 6.19.2
- **Database:** SQLite (dev), PostgreSQL (production-ready)
- **Validation:** Zod 4.3.5
- **Password Hashing:** bcryptjs 3.0.3

### Development Tools
- **Build Tool:** Turbopack (Next.js experimental)
- **Linting:** ESLint with Next.js + TypeScript config
- **Type Checking:** TypeScript strict mode
- **Package Manager:** npm

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18.x or higher
- **npm** 9.x or higher (or yarn/pnpm)
- **Git** for version control

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <repository-url>
cd vds-erp-website
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Update the `.env` file with your configuration:

```env
DATABASE_URL="file:./prisma/dev.db"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secure-random-secret-here"
```

**Generate a secure NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

### 4. Initialize the Database

```bash
# Generate Prisma Client
npm run prisma:generate

# Push schema to database
npm run db:push

# Seed the database with initial data
npm run db:seed
```

### 5. Start the Development Server

```bash
npm run dev
```

or with Turbopack for faster builds:

```bash
npm run dev:turbo
```

Open [http://localhost:3000](http://localhost:3000) in your browser.



⚠️ **Important:** Change the default password after first login in production!

## 📁 Project Structure

```
vds-erp-website/
├── app/                         # Next.js App Router
│   ├── accountant/             # Main authenticated application
│   │   ├── dashboard/          # Dashboard with stats and tasks
│   │   ├── expenses/           # Expense management
│   │   ├── vendors/            # Vendor CRUD
│   │   ├── expense-types/      # Expense categories
│   │   ├── fixed-assets/       # Asset tracking
│   │   └── history/            # Audit trail
│   ├── api/                    # REST API endpoints
│   │   ├── auth/               # NextAuth.js
│   │   ├── expenses/           # Expense endpoints
│   │   ├── vendors/            # Vendor endpoints
│   │   ├── fixed-assets/       # Asset endpoints
│   │   └── expense-types/      # Type endpoints
│   ├── components/
│   │   ├── accountant/         # Feature-specific components
│   │   └── ui/                 # Reusable UI components
│   ├── login/                  # Authentication pages
│   ├── globals.css             # Global styles
│   └── layout.tsx              # Root layout
├── lib/
│   ├── auth.ts                 # NextAuth configuration
│   ├── db.ts                   # Prisma Client
│   └── validations.ts          # Zod schemas
├── types/
│   ├── api.ts                  # API type definitions
│   └── next-auth.d.ts          # NextAuth type extensions
├── prisma/
│   ├── schema.prisma           # Database schema
│   ├── seed.ts                 # Seed data
│   └── migrations/             # Migration history
├── public/                     # Static assets
├── .env                        # Environment variables (create this)
├── .env.example                # Environment template
├── next.config.mjs             # Next.js configuration
├── tsconfig.json               # TypeScript configuration
├── tailwind.config.ts          # Tailwind configuration
└── package.json                # Dependencies and scripts
```

## 📚 Documentation

Comprehensive documentation is available:

- **[ARCHITECTURE.md](ARCHITECTURE.md)** - System design, patterns, and technical decisions
- **[API_DOCUMENTATION.md](API_DOCUMENTATION.md)** - Complete API reference with examples
- **[DATABASE.md](DATABASE.md)** - Schema details, relationships, and migrations
- **[DEPLOYMENT.md](DEPLOYMENT.md)** - Production deployment guide
- **[CONTRIBUTING.md](CONTRIBUTING.md)** - Development guidelines and best practices
- **[MVP(Phase-1).md](MVP(Phase-1).md)** - Original MVP specification

## 🔑 Default Credentials

The seeded database includes a default admin user:

| Field    | Value           |
|----------|-----------------|
| Email    | admin@vds.com   |
| Password | admin123        |
| Role     | accountant      |
| Status   | active          |

**Security Note:** Always change default credentials in production environments.

## 📜 Available Scripts

### Development

```bash
npm run dev          # Start development server
npm run dev:turbo    # Start with Turbopack (faster)
npm run build        # Build for production
npm run start        # Start production server
```

### Database

```bash
npm run db:push      # Push Prisma schema to database
npm run db:seed      # Seed database with initial data
npm run db:studio    # Open Prisma Studio (GUI)
```

### Linting & Type Checking

```bash
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript compiler check
```

## 🌍 Environment Variables

Create a `.env` file based on `.env.example`:

| Variable         | Description                          | Example                          |
|------------------|--------------------------------------|----------------------------------|
| DATABASE_URL     | Database connection string           | `file:./prisma/dev.db`           |
| NEXTAUTH_URL     | Application URL                      | `http://localhost:3000`          |
| NEXTAUTH_SECRET  | Secret for JWT signing (32+ chars)   | `<generate with openssl>`        |

**Production Considerations:**
- Use PostgreSQL for DATABASE_URL in production
- Set NEXTAUTH_URL to your actual domain
- Generate a cryptographically secure NEXTAUTH_SECRET

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for:

- Code style guidelines
- Development workflow
- Pull request process
- Testing requirements

## 📄 License

This project is proprietary software owned by Vedic Dharma Sansthan.

---

## 🆘 Support

For issues, questions, or feature requests:

1. Check existing documentation
2. Search closed issues
3. Open a new issue with detailed information

## 🗺️ Roadmap

### Phase 1 (Current - MVP)
- ✅ User authentication
- ✅ Expense management
- ✅ Vendor management
- ✅ Fixed asset tracking
- ✅ Dashboard with analytics

### Phase 2 (Planned)
- 🔲 Income tracking module
- 🔲 Multi-user roles with granular permissions
- 🔲 Advanced reporting and Excel export
- 🔲 Email notifications
- 🔲 Purchase Orders module
- 🔲 Work Orders module
- 🔲 Enhanced receipt management with OCR

---

**Built with ❤️ for Vedic Dharma Sansthan**

*"Seva isn't just physical action but a way to dissolve the ego and connect with the Divine"*
