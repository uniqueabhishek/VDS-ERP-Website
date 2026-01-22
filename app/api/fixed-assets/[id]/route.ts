import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

// GET - Get single fixed asset
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const asset = await prisma.fixedAsset.findUnique({
      where: { id: params.id },
      include: {
        user: {
          select: {
            fullName: true,
            email: true,
          },
        },
      },
    })

    if (!asset) {
      return NextResponse.json({ error: 'Asset not found' }, { status: 404 })
    }

    return NextResponse.json(asset)
  } catch (error) {
    console.error('Error fetching fixed asset:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PUT - Update fixed asset
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()

    const asset = await prisma.fixedAsset.update({
      where: { id: params.id },
      data: {
        assetName: body.assetName,
        description: body.description,
        location: body.location,
        purchaseDate: body.purchaseDate ? new Date(body.purchaseDate) : undefined,
        purchaseValue: body.purchaseValue ? parseFloat(body.purchaseValue) : undefined,
        currentValue: body.currentValue ? parseFloat(body.currentValue) : null,
        status: body.status,
        notes: body.notes,
      },
      include: {
        user: {
          select: {
            fullName: true,
            email: true,
          },
        },
      },
    })

    return NextResponse.json(asset)
  } catch (error: any) {
    console.error('Error updating fixed asset:', error)
    if (error.code === 'P2025') {
      return NextResponse.json({ error: 'Asset not found' }, { status: 404 })
    }
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// DELETE - Delete fixed asset
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await prisma.fixedAsset.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ message: 'Asset deleted successfully' })
  } catch (error: any) {
    console.error('Error deleting fixed asset:', error)
    if (error.code === 'P2025') {
      return NextResponse.json({ error: 'Asset not found' }, { status: 404 })
    }
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
