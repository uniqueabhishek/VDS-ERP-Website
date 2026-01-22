import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

// GET - Get single vendor by ID
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // DEVELOPMENT: Auth check disabled
    // const session = await getServerSession(authOptions)
    // if (!session?.user) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    // }

    const vendor = await prisma.vendor.findUnique({
      where: { id: (await params).id },
      include: {
        _count: {
          select: { expenses: true }
        }
      }
    })

    if (!vendor) {
      return NextResponse.json({ error: 'Vendor not found' }, { status: 404 })
    }

    return NextResponse.json(vendor)
  } catch (error) {
    console.error('Error fetching vendor:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PUT - Update vendor
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // DEVELOPMENT: Auth check disabled
    // const session = await getServerSession(authOptions)
    // if (!session?.user) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    // }

    const body = await req.json()

    if (!body.name || !body.name.trim()) {
      return NextResponse.json(
        { error: 'Vendor name is required' },
        { status: 400 }
      )
    }

    const vendor = await prisma.vendor.update({
      where: { id: (await params).id },
      data: {
        name: body.name.trim(),
        contactPerson: body.contactPerson?.trim() || null,
        phone: body.phone?.trim() || null,
        email: body.email?.trim() || null,
        address: body.address?.trim() || null,
        gstNumber: body.gstNumber?.trim() || null,
        notes: body.notes?.trim() || null,
      },
    })

    return NextResponse.json(vendor)
  } catch (error) {
    console.error('Error updating vendor:', error)

    if (error && typeof error === 'object' && 'code' in error) {
      if (error.code === 'P2002') {
        return NextResponse.json(
          { error: 'A vendor with this name already exists' },
          { status: 409 }
        )
      }

      if (error.code === 'P2025') {
        return NextResponse.json(
          { error: 'Vendor not found' },
          { status: 404 }
        )
      }
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// DELETE - Delete vendor
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // DEVELOPMENT: Auth check disabled
    // const session = await getServerSession(authOptions)
    // if (!session?.user) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    // }

    // Check if vendor has expenses
    const vendor = await prisma.vendor.findUnique({
      where: { id: (await params).id },
      include: {
        _count: {
          select: { expenses: true }
        }
      }
    })

    if (!vendor) {
      return NextResponse.json({ error: 'Vendor not found' }, { status: 404 })
    }

    if (vendor._count.expenses > 0) {
      return NextResponse.json(
        { error: `Cannot delete vendor with ${vendor._count.expenses} linked expense(s)` },
        { status: 400 }
      )
    }

    await prisma.vendor.delete({
      where: { id: (await params).id },
    })

    return NextResponse.json({ message: 'Vendor deleted successfully' })
  } catch (error) {
    console.error('Error deleting vendor:', error)

    if (error && typeof error === 'object' && 'code' in error && error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Vendor not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
