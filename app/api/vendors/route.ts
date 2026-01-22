import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

// GET - List all vendors
export async function GET(req: NextRequest) {
  try {
    // DEVELOPMENT: Auth check disabled
    // const session = await getServerSession(authOptions)
    // if (!session?.user) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    // }

    const vendors = await prisma.vendor.findMany({
      orderBy: { name: 'asc' },
      include: {
        _count: {
          select: { expenses: true }
        }
      }
    })

    return NextResponse.json(vendors)
  } catch (error) {
    console.error('Error fetching vendors:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST - Create new vendor
export async function POST(req: NextRequest) {
  try {
    // DEVELOPMENT: Auth check disabled
    // const session = await getServerSession(authOptions)
    // if (!session?.user) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    // }

    const body = await req.json()

    // Validate required fields
    if (!body.name || !body.name.trim()) {
      return NextResponse.json(
        { error: 'Vendor name is required' },
        { status: 400 }
      )
    }

    // DEVELOPMENT: Use hardcoded admin user ID from seed data
    const adminUser = await prisma.user.findUnique({ where: { email: 'admin@vds.com' } })

    const vendor = await prisma.vendor.create({
      data: {
        name: body.name.trim(),
        contactPerson: body.contactPerson?.trim() || null,
        phone: body.phone?.trim() ||null,
        email: body.email?.trim() || null,
        address: body.address?.trim() || null,
        gstNumber: body.gstNumber?.trim() || null,
        notes: body.notes?.trim() || null,
        createdBy: adminUser?.id || 'default-user-id',
      },
    })

    return NextResponse.json(vendor, { status: 201 })
  } catch (error) {
    console.error('Error creating vendor:', error)

    // Handle unique constraint violation
    if (error && typeof error === 'object' && 'code' in error && error.code === 'P2002') {
      return NextResponse.json(
        { error: 'A vendor with this name already exists' },
        { status: 409 }
      )
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
