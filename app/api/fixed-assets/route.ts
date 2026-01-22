import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

// GET - List all fixed assets
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const status = searchParams.get('status')
    const location = searchParams.get('location')

    const where: any = {}

    if (status) {
      where.status = status
    }

    if (location) {
      where.location = { contains: location }
    }

    const assets = await prisma.fixedAsset.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: {
            fullName: true,
            email: true,
          },
        },
      },
    })

    return NextResponse.json(assets)
  } catch (error) {
    console.error('Error fetching fixed assets:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST - Create new fixed asset
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()

    // Validate required fields
    if (!body.assetName || !body.location || !body.purchaseDate || !body.purchaseValue) {
      return NextResponse.json(
        { error: 'Missing required fields: assetName, location, purchaseDate, purchaseValue' },
        { status: 400 }
      )
    }

    const asset = await prisma.fixedAsset.create({
      data: {
        assetName: body.assetName,
        description: body.description || null,
        location: body.location,
        purchaseDate: new Date(body.purchaseDate),
        purchaseValue: parseFloat(body.purchaseValue),
        currentValue: body.currentValue ? parseFloat(body.currentValue) : null,
        status: body.status || 'active',
        notes: body.notes || null,
        createdBy: (session.user as any).id,
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

    return NextResponse.json(asset, { status: 201 })
  } catch (error) {
    console.error('Error creating fixed asset:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
