
import { prisma } from '@/lib/db';
import { NextResponse } from 'next/server';


export async function GET() {
  try {
    const expenseTypes = await (prisma as any).expenseType.findMany({
      orderBy: { name: 'asc' },
    });
    return NextResponse.json(expenseTypes);
  } catch (error: any) {
    console.error('Error fetching expense types:', error);
    return NextResponse.json({ error: 'Failed to fetch expense types', details: error?.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, description } = body;

    if (!name) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }

    const expenseType = await (prisma as any).expenseType.create({
      data: {
        name,
        description,
      },
    });

    return NextResponse.json(expenseType, { status: 201 });
  } catch (error: any) {
    console.error('Error creating expense type:', error);
    console.error('Error message:', error?.message);
    console.error('Error stack:', error?.stack);
    return NextResponse.json({
      error: 'Failed to create expense type',
      details: error?.message
    }, { status: 500 });
  }
}
