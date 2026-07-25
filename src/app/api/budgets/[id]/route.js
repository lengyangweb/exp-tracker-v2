import jwt from 'jsonwebtoken';
import prismaClient from '@/lib/prisma';
import { NextResponse } from 'next/server';

function getUserFromRequest(request) {
  const session = request.cookies.get('access-token');
  if (!session?.value) return null;

  try {
    return jwt.decode(session.value);
  } catch (error) {
    return null;
  }
}

async function buildBudgetPayload(userId, month, year, budget) {
  const monthStart = new Date(`${month}-01T00:00:00.000Z`);
  const nextMonth = new Date(monthStart);
  nextMonth.setUTCMonth(nextMonth.getUTCMonth() + 1);

  const histories = await prismaClient.histories.findMany({
    where: {
      userId,
      historyDate: {
        gte: monthStart,
        lt: nextMonth,
      },
    },
    select: {
      amount: true,
      type: true,
    },
  });

  const spent = histories.reduce((total, entry) => {
    if (entry.type === 'expense') {
      return total + Number(entry.amount || 0);
    }
    return total;
  }, 0);

  const remaining = budget ? Number(budget.amount || 0) - spent : null;

  return {
    ...(budget ?? {}),
    month,
    year,
    spent,
    remaining,
    isOverBudget: budget ? remaining < 0 : false,
  };
}

export async function PUT(request, { params }) {
  const userSession = getUserFromRequest(request);

  if (!userSession?.userId) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();

  if (!body?.amount || Number(body.amount) <= 0) {
    return NextResponse.json({ message: 'Budget amount must be greater than 0' }, { status: 400 });
  }

  const month = body?.month || new Date().toISOString().slice(0, 7);
  const year = Number(body?.year || new Date().getFullYear());

  try {
    const existingBudget = await prismaClient.budget.findFirst({
      where: {
        id: params.id,
        userId: userSession.userId,
      },
    });

    if (!existingBudget) {
      return NextResponse.json({ message: 'Budget not found' }, { status: 404 });
    }

    const updatedBudget = await prismaClient.budget.update({
      where: { id: params.id },
      data: {
        amount: Number(body.amount),
        month,
        year,
        currency: body.currency || 'USD',
      },
    });

    const payload = await buildBudgetPayload(userSession.userId, month, year, updatedBudget);
    return NextResponse.json(payload, { status: 200 });
  } catch (error) {
    console.error('Update budget error', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const userSession = getUserFromRequest(request);

  if (!userSession?.userId) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const existingBudget = await prismaClient.budget.findFirst({
      where: {
        id: params.id,
        userId: userSession.userId,
      },
    });

    if (!existingBudget) {
      return NextResponse.json({ message: 'Budget not found' }, { status: 404 });
    }

    await prismaClient.budget.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Delete budget error', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
