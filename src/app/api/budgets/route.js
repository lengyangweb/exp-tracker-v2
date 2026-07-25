import jwt from 'jsonwebtoken';
import prismaClient from '@/lib/prisma';
import { NextResponse } from 'next/server';

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

/**
 * @param {NextResponse} request 
 * @returns {{ userId: string }}
 */
function getUserFromRequest(request) {
  const session = request.cookies.get('access-token');
  if (!session?.value) return null;

  try {
    return jwt.decode(session.value);
  } catch (error) {
    return null;
  }
}

export async function GET(request) {
  const userSession = getUserFromRequest(request);

  if (!userSession?.userId) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const month = searchParams.get('month');
  const year = Number(searchParams.get('year'));

  try {
    const budget = await prismaClient.budget.findFirst({
      where: {
        userId: userSession.userId,
        month: month || new Date().toISOString().slice(0, 7),
        year: Number.isNaN(year) ? new Date().getFullYear() : year,
      },
      orderBy: { createdAt: 'desc' },
    });

    if (!budget) {
      return NextResponse.json(null);
    }

    const payload = await buildBudgetPayload(userSession.userId, month || budget.month, Number.isNaN(year) ? budget.year : year, budget);
    return NextResponse.json(payload);
  } catch (error) {
    console.error('Get budget error', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request) {
  const userSession = getUserFromRequest(request);

  if (!userSession?.userId) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();

  if (!body?.amount || Number(body.amount) <= 0) {
    return NextResponse.json({ message: 'Budget amount must be greater than 0' }, { status: 400 });
  }

  if (!body?.month || !body?.year) {
    return NextResponse.json({ message: 'Month and year are required' }, { status: 400 });
  }

  try {
    const existing = await prismaClient.budget.findFirst({
      where: {
        userId: userSession.userId,
        month: body.month,
        year: Number(body.year),
      },
    });

    if (existing) {
      const updated = await prismaClient.budget.update({
        where: { id: existing.id },
        data: {
          amount: Number(body.amount),
          month: body.month,
          year: Number(body.year),
          currency: body.currency || 'USD',
        },
      });
      const payload = await buildBudgetPayload(userSession.userId, body.month, Number(body.year), updated);
      return NextResponse.json(payload, { status: 200 });
    }

    const created = await prismaClient.budget.create({
      data: {
        userId: userSession.userId,
        month: body.month,
        year: Number(body.year),
        amount: Number(body.amount),
        currency: body.currency || 'USD',
      },
    });

    const payload = await buildBudgetPayload(userSession.userId, body.month, Number(body.year), created);
    return NextResponse.json(payload, { status: 201 });
  } catch (error) {
    console.error('Create budget error', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
