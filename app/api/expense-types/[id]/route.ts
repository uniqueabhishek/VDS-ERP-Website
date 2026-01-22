
import { prisma } from '@/lib/db';
import { NextResponse } from 'next/server';


export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const body = await request.json();
    const { name, description } = body;
    const { id } = await params;

    const expenseType = await (prisma).expenseType.update({
      where: { id: id },
      data: { name, description },
    });

    return NextResponse.json(expenseType);
  } catch (error) {
    console.error('Error updating expense type:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ error: 'Failed to update expense type', details: errorMessage }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await (prisma).expenseType.delete({
      where: { id: id },
    });
    return NextResponse.json({ message: 'Expense type deleted' });
  } catch (error) {
    console.error('Error deleting expense type:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ error: 'Failed to delete expense type', details: errorMessage }, { status: 500 });
  }
}
