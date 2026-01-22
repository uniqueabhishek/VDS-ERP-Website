
import { prisma } from '@/lib/db';
import { NextResponse } from 'next/server';


export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const { name, description } = body;
    const id = params.id; // Corrected: Using params.id directly if it is a string. Assuming standard Nextjs route param handling.
    // However, in Next.js 13+ App Router, params are usually passed as context to the function.
    // Wait, the standard signature is (request: Request, { params }: { params: { id: string } }).
    // Let's assume the folder structure app/api/expense-types/[id]/route.ts

    const expenseType = await (prisma as any).expenseType.update({
      where: { id: id },
      data: { name, description },
    });

    return NextResponse.json(expenseType);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update expense type' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id;
    await (prisma as any).expenseType.delete({
      where: { id: id },
    });
    return NextResponse.json({ message: 'Expense type deleted' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete expense type' }, { status: 500 });
  }
}
