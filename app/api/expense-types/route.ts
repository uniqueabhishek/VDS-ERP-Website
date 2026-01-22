import { prisma } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const expenseTypes = await prisma.expenseType.findMany({
      orderBy: { name: 'asc' },
    })
    return NextResponse.json(expenseTypes)
  } catch (error) {
    console.error('Error fetching expense types:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json(
      { error: 'Failed to fetch expense types', details: errorMessage },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, description } = body

    if (!name) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 })
    }

    const expenseType = await prisma.expenseType.create({
      data: {
        name,
        description,
      },
    })

    return NextResponse.json(expenseType, { status: 201 })
  } catch (error) {
    console.error('Error creating expense type:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json(
      {
        error: 'Failed to create expense type',
        details: errorMessage,
      },
      { status: 500 }
    )
  }
}
