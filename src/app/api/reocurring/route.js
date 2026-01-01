import jwt from 'jsonwebtoken';
import prismaClient from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

/** * Get all reocurring expenses in the database
 * @param {NextRequest} request 
 */
export async function GET(request) {
  const session = request.cookies.get('access-token');

  if (!session || !session?.value) {
    return NextResponse.json({
      errorType: 'auth',
      message: 'Unauthorized'
    }, { status: 401 });
  }

  const userSession = jwt.decode(session.value);

  let result;
  try {
    result = await prismaClient.reOccuringExpenses.findMany({
      where: {
        userId: userSession.userId
      },
      orderBy: { createdAt: 'desc' }
    });
  } catch (error) {
    console.error('Find all reocurring expenses error', error);
    return NextResponse.json({
      errorType: 'serverError',
      message: 'Internal Server Error'
    });
  }

  return NextResponse.json(result);
}

/**
 * Create a new reocurring expense
 * @param {NextRequest} request 
 * @returns {NextResponse}
 */
export async function POST(request) {
  const session = request.cookies.get('access-token');

  if (!session || !session?.value) {
    return NextResponse.json({
      errorType: 'auth',
      message: 'Unauthorized'
    }, { status: 401 });
  }

  const userSession = jwt.decode(session.value);

  const body = await request.json();

  let newReocurringExpense;
  try {
    newReocurringExpense = await prismaClient.reOccuringExpenses.create({
      data: {
        userId: userSession.userId,
        title: body.title,
        amount: body.amount,
        frequency: body.frequency,
        startDate: new Date(body.startDate),
        endDate: body.endDate ? new Date(body.endDate) : null,
      }
    });
  } catch (error) {
    console.error('Create reocurring expense error', error);
    return NextResponse.json({
      errorType: 'serverError',
      message: 'Internal Server Error'
    });
  }

  return NextResponse.json(newReocurringExpense);
}