# Deployment Guide

Complete guide for deploying VDS ERP to production environments.

## Table of Contents

1. [Overview](#overview)
2. [Pre-Deployment Checklist](#pre-deployment-checklist)
3. [Environment Configuration](#environment-configuration)
4. [Database Migration](#database-migration)
5. [Deployment Options](#deployment-options)
   - [Vercel (Recommended)](#vercel-recommended)
   - [Docker](#docker)
   - [Traditional Server (VPS)](#traditional-server-vps)
   - [AWS](#aws)
6. [Post-Deployment](#post-deployment)
7. [Monitoring & Maintenance](#monitoring--maintenance)
8. [Troubleshooting](#troubleshooting)
9. [Rollback Procedures](#rollback-procedures)

---

## Overview

VDS ERP is a Next.js application that can be deployed to various platforms. This guide covers multiple deployment strategies with recommended practices for production environments.

**Deployment Architecture:**

```
┌─────────────────────────────────────────────┐
│         CDN (Static Assets)                 │
│    - Images, CSS, JS bundles                │
└─────────────────┬───────────────────────────┘
                  │
┌─────────────────▼───────────────────────────┐
│      Next.js Server (Edge/Lambda)           │
│  - Server Components rendering              │
│  - API Routes                               │
│  - Authentication                           │
└─────────────────┬───────────────────────────┘
                  │
┌─────────────────▼───────────────────────────┐
│      PostgreSQL Database                    │
│  - Primary data store                       │
│  - Managed service (recommended)            │
└─────────────────────────────────────────────┘
```

---

## Pre-Deployment Checklist

Before deploying to production, ensure:

### Security

- [ ] Changed default admin password
- [ ] Generated secure `NEXTAUTH_SECRET` (32+ characters)
- [ ] Configured HTTPS/SSL certificates
- [ ] Reviewed all environment variables
- [ ] Removed debug/development code
- [ ] Disabled source maps in production (optional)
- [ ] Set up CORS policies if needed
- [ ] Reviewed file upload security

### Database

- [ ] Migrated from SQLite to PostgreSQL
- [ ] Ran all Prisma migrations
- [ ] Seeded initial data (if needed)
- [ ] Set up database backups
- [ ] Configured connection pooling
- [ ] Tested database performance

### Code Quality

- [ ] All tests passing (`npm test`)
- [ ] No TypeScript errors (`npm run type-check`)
- [ ] No ESLint errors (`npm run lint`)
- [ ] Production build successful (`npm run build`)
- [ ] Optimized images and assets
- [ ] Removed unused dependencies

### Monitoring

- [ ] Set up error tracking (Sentry, Rollbar, etc.)
- [ ] Configured application logs
- [ ] Set up uptime monitoring
- [ ] Configured alerts for critical errors
- [ ] Set up performance monitoring (optional)

---

## Environment Configuration

### Required Environment Variables

Create a `.env.production` file:

```env
# Database
DATABASE_URL="postgresql://user:password@host:5432/vds_erp?schema=public"

# NextAuth.js
NEXTAUTH_URL="https://your-production-domain.com"
NEXTAUTH_SECRET="your-secure-random-secret-min-32-chars"

# Optional: File Upload
UPLOAD_DIR="/var/www/uploads"
MAX_FILE_SIZE="5242880"  # 5MB in bytes

# Optional: Email (for future features)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="noreply@yourdomain.com"
SMTP_PASSWORD="your-email-password"

# Optional: Monitoring
SENTRY_DSN="https://xxxxx@sentry.io/xxxxx"
```

### Generating Secure Secrets

```bash
# Generate NEXTAUTH_SECRET
openssl rand -base64 32

# Alternative: Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

### Database URL Format

**PostgreSQL:**
```
postgresql://[user]:[password]@[host]:[port]/[database]?schema=public&connection_limit=10
```

**Example with connection pooling:**
```
postgresql://vds_user:secure_password@db.example.com:5432/vds_erp_prod?schema=public&connection_limit=10&pool_timeout=20
```

**Connection Pooling Services:**
- **PgBouncer:** Recommended for high traffic
- **Supabase:** Built-in connection pooler
- **Neon:** Serverless Postgres with auto-pooling

---

## Database Migration

### Step 1: Export SQLite Data (Development)

```bash
# Export data to SQL file
sqlite3 prisma/dev.db .dump > backup.sql

# Or use Prisma Studio to export CSV
npm run db:studio
# Export each table manually
```

### Step 2: Set Up PostgreSQL

**Option A: Managed Services (Recommended)**

**Supabase:**
1. Create account at [supabase.com](https://supabase.com)
2. Create new project
3. Copy connection string from Settings > Database
4. Add `?pgbouncer=true` for connection pooling

**Neon:**
1. Create account at [neon.tech](https://neon.tech)
2. Create new project
3. Copy connection string (pooled)

**AWS RDS:**
1. Create PostgreSQL instance in RDS console
2. Configure security groups (allow port 5432)
3. Note endpoint and credentials

**Option B: Self-Hosted**

```bash
# Install PostgreSQL (Ubuntu/Debian)
sudo apt update
sudo apt install postgresql postgresql-contrib

# Create database and user
sudo -u postgres psql
CREATE DATABASE vds_erp_prod;
CREATE USER vds_user WITH PASSWORD 'secure_password';
GRANT ALL PRIVILEGES ON DATABASE vds_erp_prod TO vds_user;
\q
```

### Step 3: Update Prisma Schema

```prisma
// prisma/schema.prisma
datasource db {
  provider = "postgresql"  // Changed from sqlite
  url      = env("DATABASE_URL")
}
```

### Step 4: Run Migrations

```bash
# Set production database URL
export DATABASE_URL="postgresql://..."

# Generate Prisma Client for PostgreSQL
npx prisma generate

# Push schema to database
npx prisma db push

# OR use migrations (recommended for production)
npx prisma migrate deploy

# Seed initial data
npx prisma db seed
```

### Step 5: Verify Migration

```bash
# Open Prisma Studio
npx prisma studio

# Verify tables exist
# Check data integrity
```

---

## Deployment Options

---

## Vercel (Recommended)

Vercel is the easiest deployment option for Next.js applications.

### Why Vercel?

✅ **Pros:**
- Zero-config deployment
- Automatic HTTPS/SSL
- Global CDN for static assets
- Serverless functions for API routes
- Preview deployments for every PR
- Automatic cache invalidation
- Built-in analytics

❌ **Cons:**
- Limited control over server environment
- Cold starts on serverless functions
- Cost for high traffic (generous free tier)

### Deployment Steps

#### 1. Install Vercel CLI

```bash
npm install -g vercel
```

#### 2. Login to Vercel

```bash
vercel login
```

#### 3. Configure Project

Create `vercel.json`:

```json
{
  "buildCommand": "prisma generate && prisma db push && next build",
  "devCommand": "next dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "regions": ["bom1"],
  "env": {
    "NEXTAUTH_URL": "@nextauth_url",
    "NEXTAUTH_SECRET": "@nextauth_secret",
    "DATABASE_URL": "@database_url"
  }
}
```

**Region Codes:**
- `bom1` - Mumbai, India (recommended for Indian users)
- `sin1` - Singapore
- `hnd1` - Tokyo
- `iad1` - Washington D.C., USA

#### 4. Deploy

```bash
# Deploy to preview environment
vercel

# Deploy to production
vercel --prod
```

#### 5. Set Environment Variables

**Via CLI:**
```bash
vercel env add NEXTAUTH_SECRET production
# Paste your secret when prompted

vercel env add DATABASE_URL production
# Paste your PostgreSQL connection string

vercel env add NEXTAUTH_URL production
# Enter: https://your-domain.vercel.app
```

**Via Vercel Dashboard:**
1. Go to project settings
2. Navigate to Environment Variables
3. Add each variable
4. Select "Production" environment
5. Save

#### 6. Configure Custom Domain (Optional)

```bash
vercel domains add yourdomain.com
```

Then add DNS records:
- `A` record: `76.76.21.21`
- `CNAME` record: `cname.vercel-dns.com`

#### 7. Redeploy

```bash
vercel --prod
```

### Vercel Build Settings

**Framework Preset:** Next.js

**Build Command:**
```bash
prisma generate && prisma migrate deploy && next build
```

**Output Directory:** `.next`

**Install Command:**
```bash
npm install
```

**Development Command:**
```bash
next dev
```

### Automatic Deployments

**Connect GitHub Repository:**
1. Go to Vercel dashboard
2. Import Git Repository
3. Select your repo
4. Configure build settings
5. Add environment variables
6. Deploy

**Every push to `main` branch will auto-deploy to production.**

---

## Docker

Deploy using Docker containers for maximum portability.

### Dockerfile

Create `Dockerfile` in project root:

```dockerfile
# Base image
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm ci

# Generate Prisma Client
RUN npx prisma generate

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Set environment variable for build
ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV production

RUN npm run build

# Production image, copy all files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set correct permissions
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

### docker-compose.yml

```yaml
version: '3.8'

services:
  app:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=${DATABASE_URL}
      - NEXTAUTH_URL=${NEXTAUTH_URL}
      - NEXTAUTH_SECRET=${NEXTAUTH_SECRET}
    depends_on:
      - postgres
    restart: unless-stopped

  postgres:
    image: postgres:15-alpine
    environment:
      - POSTGRES_USER=vds_user
      - POSTGRES_PASSWORD=secure_password
      - POSTGRES_DB=vds_erp_prod
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"
    restart: unless-stopped

volumes:
  postgres_data:
```

### Deployment Commands

```bash
# Build and start containers
docker-compose up -d

# View logs
docker-compose logs -f app

# Stop containers
docker-compose down

# Rebuild after code changes
docker-compose up -d --build
```

### Update next.config.mjs

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // Required for Docker
  // ... other config
};

export default nextConfig;
```

---

## Traditional Server (VPS)

Deploy to a virtual private server (DigitalOcean, Linode, AWS EC2, etc.).

### Prerequisites

- Ubuntu 22.04 LTS (recommended)
- Root or sudo access
- Minimum 2GB RAM, 2 CPU cores

### Step 1: Server Setup

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 18.x
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install PostgreSQL
sudo apt install -y postgresql postgresql-contrib

# Install Nginx (reverse proxy)
sudo apt install -y nginx

# Install PM2 (process manager)
sudo npm install -g pm2
```

### Step 2: Create Application User

```bash
sudo adduser vds-erp
sudo usermod -aG sudo vds-erp
sudo su - vds-erp
```

### Step 3: Clone Repository

```bash
cd /home/vds-erp
git clone <your-repo-url> vds-erp-app
cd vds-erp-app
```

### Step 4: Install Dependencies

```bash
npm ci --production
```

### Step 5: Configure Environment

```bash
nano .env.production
```

Add all required environment variables.

### Step 6: Build Application

```bash
npm run build
```

### Step 7: Start with PM2

```bash
pm2 start npm --name "vds-erp" -- start
pm2 save
pm2 startup
```

### Step 8: Configure Nginx

```bash
sudo nano /etc/nginx/sites-available/vds-erp
```

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/vds-erp /etc/nginx/sites-enabled/

# Test Nginx config
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
```

### Step 9: Configure SSL with Let's Encrypt

```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Obtain certificate
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Auto-renewal (added automatically)
sudo systemctl status certbot.timer
```

### Step 10: Configure Firewall

```bash
sudo ufw allow 'Nginx Full'
sudo ufw allow OpenSSH
sudo ufw enable
```

### Updating the Application

```bash
cd /home/vds-erp/vds-erp-app
git pull origin main
npm ci --production
npm run build
pm2 restart vds-erp
```

---

## AWS

Deploy to AWS using various services.

### Option A: AWS Elastic Beanstalk

**1. Install EB CLI:**
```bash
pip install awsebcli
```

**2. Initialize:**
```bash
eb init -p node.js vds-erp-app --region ap-south-1
```

**3. Create Environment:**
```bash
eb create vds-erp-prod
```

**4. Set Environment Variables:**
```bash
eb setenv NEXTAUTH_SECRET="..." DATABASE_URL="..." NEXTAUTH_URL="..."
```

**5. Deploy:**
```bash
eb deploy
```

### Option B: AWS ECS (Fargate)

**1. Build and push Docker image:**
```bash
# Authenticate to ECR
aws ecr get-login-password --region ap-south-1 | docker login --username AWS --password-stdin <account-id>.dkr.ecr.ap-south-1.amazonaws.com

# Build and tag
docker build -t vds-erp .
docker tag vds-erp:latest <account-id>.dkr.ecr.ap-south-1.amazonaws.com/vds-erp:latest

# Push
docker push <account-id>.dkr.ecr.ap-south-1.amazonaws.com/vds-erp:latest
```

**2. Create ECS Task Definition (JSON)**

**3. Create ECS Service with Fargate**

**4. Configure Application Load Balancer**

### Option C: AWS Amplify

**1. Connect GitHub repository**

**2. Configure build settings:**
```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm ci
        - npx prisma generate
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: .next
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
```

**3. Add environment variables**

**4. Deploy**

---

## Post-Deployment

### 1. Verify Deployment

**Health Check:**
```bash
curl https://yourdomain.com/api/health
```

Expected response:
```json
{
  "status": "ok",
  "timestamp": "2025-01-15T10:30:00.000Z"
}
```

**Database Connection:**
```bash
# SSH into server
psql $DATABASE_URL -c "SELECT COUNT(*) FROM \"User\";"
```

### 2. Test Critical Flows

- [ ] User login
- [ ] Create expense
- [ ] Upload receipt
- [ ] View dashboard
- [ ] Logout

### 3. Performance Testing

```bash
# Load testing with Apache Bench
ab -n 1000 -c 10 https://yourdomain.com/

# Or use k6
k6 run loadtest.js
```

### 4. Security Scan

```bash
# Install OWASP ZAP or use online tools
npm audit
npm audit fix
```

### 5. Set Up Monitoring

**Sentry (Error Tracking):**

```bash
npm install @sentry/nextjs
```

```javascript
// sentry.client.config.js
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 1.0,
  environment: process.env.NODE_ENV,
});
```

**Uptime Monitoring:**
- [UptimeRobot](https://uptimerobot.com) (free)
- [Pingdom](https://www.pingdom.com)
- [StatusCake](https://www.statuscake.com)

### 6. Database Backups

**Automated Backups (Managed Services):**
- Supabase: Daily automatic backups
- AWS RDS: Automated backups with point-in-time recovery
- Neon: Continuous backups

**Manual Backups (Self-Hosted):**

```bash
# Create backup script
cat > /home/vds-erp/backup.sh << 'EOF'
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
pg_dump $DATABASE_URL > /backups/vds_erp_$DATE.sql
# Keep only last 30 days
find /backups -name "vds_erp_*.sql" -mtime +30 -delete
EOF

chmod +x /home/vds-erp/backup.sh

# Schedule with cron
crontab -e
# Add: 0 2 * * * /home/vds-erp/backup.sh
```

---

## Monitoring & Maintenance

### Application Logs

**Vercel:**
```bash
vercel logs <deployment-url>
```

**PM2:**
```bash
pm2 logs vds-erp
pm2 monit
```

**Docker:**
```bash
docker-compose logs -f app
```

### Database Monitoring

**Prisma Logging:**
```typescript
// lib/db.ts
const prisma = new PrismaClient({
  log: ['query', 'error', 'warn'],
});
```

**PostgreSQL Logs:**
```bash
sudo tail -f /var/log/postgresql/postgresql-15-main.log
```

### Performance Monitoring

**Next.js Analytics (Vercel):**
- Automatically enabled on Vercel
- View in dashboard

**Custom Metrics:**
```javascript
// pages/api/expenses/route.ts
console.time('fetchExpenses');
const expenses = await prisma.expense.findMany();
console.timeEnd('fetchExpenses');
```

---

## Troubleshooting

### Common Issues

#### 1. "Unauthorized" on All API Requests

**Cause:** Session cookies not being sent/received

**Solution:**
```env
# Ensure NEXTAUTH_URL matches your domain exactly
NEXTAUTH_URL="https://yourdomain.com"

# In production, cookies require HTTPS
```

#### 2. Database Connection Timeout

**Cause:** Connection pooling exhausted

**Solution:**
```env
# Increase connection limit
DATABASE_URL="postgresql://...?connection_limit=20&pool_timeout=30"
```

#### 3. File Upload Fails

**Cause:** Directory permissions

**Solution:**
```bash
# Create upload directory
mkdir -p /var/www/uploads
chown -R www-data:www-data /var/www/uploads
chmod 755 /var/www/uploads
```

#### 4. Build Fails with "Out of Memory"

**Cause:** Insufficient heap size

**Solution:**
```bash
# Increase Node.js memory
export NODE_OPTIONS="--max-old-space-size=4096"
npm run build
```

#### 5. 502 Bad Gateway (Nginx)

**Cause:** Next.js server not running

**Solution:**
```bash
# Check PM2 status
pm2 status
pm2 restart vds-erp

# Check logs
pm2 logs vds-erp
```

---

## Rollback Procedures

### Vercel Rollback

```bash
# List deployments
vercel ls

# Promote previous deployment to production
vercel promote <deployment-url>
```

### PM2 Rollback

```bash
cd /home/vds-erp/vds-erp-app

# Checkout previous version
git log --oneline
git checkout <previous-commit-hash>

# Rebuild and restart
npm run build
pm2 restart vds-erp
```

### Docker Rollback

```bash
# Pull previous image version
docker pull <registry>/vds-erp:previous-tag

# Update docker-compose.yml to use previous tag
docker-compose up -d
```

### Database Rollback

```bash
# Restore from backup
psql $DATABASE_URL < /backups/vds_erp_20250115.sql

# Or use Prisma migrations
npx prisma migrate resolve --rolled-back <migration-name>
```

---

## Scaling Strategies

### Horizontal Scaling

**Load Balancer + Multiple Instances:**

```
         ┌─────────────┐
         │Load Balancer│
         └──────┬──────┘
       ┌────────┼────────┐
       │        │        │
   ┌───▼───┐┌──▼───┐┌──▼───┐
   │App #1 ││App #2││App #3│
   └───────┘└──────┘└──────┘
```

**Vercel:** Auto-scaling built-in

**AWS:** Use ECS with auto-scaling group

**Traditional:** Nginx upstream with multiple PM2 instances

### Database Scaling

**Read Replicas:**
```typescript
// lib/db.ts
const readReplica = new PrismaClient({
  datasources: { db: { url: process.env.DATABASE_READ_URL } }
});

// Use for read operations
const expenses = await readReplica.expense.findMany();
```

**Connection Pooling:**
```env
DATABASE_URL="postgresql://...?connection_limit=50"
```

---

## Cost Estimates

### Vercel

- **Hobby (Free):** 100GB bandwidth, serverless functions
- **Pro ($20/month):** 1TB bandwidth, priority support
- **Enterprise:** Custom pricing

### AWS (ap-south-1 - Mumbai)

- **EC2 t3.small:** ~$13/month
- **RDS db.t3.micro:** ~$15/month
- **Total:** ~$28/month

### DigitalOcean

- **Droplet (2GB RAM):** $12/month
- **Managed PostgreSQL:** $15/month
- **Total:** $27/month

---

## Conclusion

For VDS ERP, we recommend:

1. **Vercel** - Fastest deployment, best DX, generous free tier
2. **PostgreSQL** - Supabase (free tier) or Neon (serverless)
3. **Sentry** - Error tracking (free tier)
4. **UptimeRobot** - Uptime monitoring (free)

This setup provides production-ready deployment with minimal cost and maximum reliability.

---

**Need Help?** Open an issue on GitHub with deployment logs and error messages.