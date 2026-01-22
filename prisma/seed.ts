import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10)

  const admin = await prisma.user.upsert({
    where: { email: 'admin@vds.com' },
    update: {},
    create: {
      username: 'admin',
      email: 'admin@vds.com',
      passwordHash: hashedPassword,
      fullName: 'Admin User',
      role: 'admin',
      status: 'active',
    },
  })

  console.log('✅ Created admin user:', admin.email)

  // Create sample expenses
  const expenses = [
    {
      expenseType: 'light',
      amount: 5000,
      expenseDate: new Date('2026-01-15'),
      vendorName: 'Local Electric Company',
      paymentMethod: 'Bank Transfer',
      billNumber: 'ELEC-001',
      description: 'Monthly electricity bill',
      createdBy: admin.id,
    },
    {
      expenseType: 'wages',
      amount: 15000,
      expenseDate: new Date('2026-01-20'),
      vendorName: 'Workers Payment',
      paymentMethod: 'Cash',
      billNumber: 'WAG-001',
      description: 'Weekly wages for staff',
      createdBy: admin.id,
    },
    {
      expenseType: 'maintenance',
      amount: 3500,
      expenseDate: new Date('2026-01-18'),
      vendorName: 'Equipment Service Center',
      paymentMethod: 'UPI',
      billNumber: 'MAINT-001',
      description: 'Machine maintenance and repairs',
      createdBy: admin.id,
    },
  ]

  for (const expense of expenses) {
    await prisma.expense.create({ data: expense })
  }

  console.log('✅ Created', expenses.length, 'sample expenses')

  console.log('🎉 Database seeding completed!')
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
