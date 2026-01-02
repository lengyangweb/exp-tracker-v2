import jwt from 'jsonwebtoken';
import prismaClient from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request, { params }) {
  const session = request.cookies.get('access-token');

  if (!session || !session?.value) {
    return NextResponse.json({
      errorType: 'auth',
      message: 'Unauthorized'
    }, { status: 401 });
  }

  const userSession = jwt.decode(session.value);

  const { id } = await params;

  const body = await request.json();

  let updatedReocurringExpense;
  try {
    updatedReocurringExpense = await prismaClient.reOccuringExpenses.updateMany({
      where: {
        id: id,
        userId: userSession.userId
      },
      data: {
        title: body.title,
        amount: body.amount,
        frequency: body.frequency,
        startDate: body.startDate,
      },
    });

    if (updatedReocurringExpense.count === 0) {
      return NextResponse.json({
        errorType: 'notFound',
        message: 'Reocurring expense not found'
      }, { status: 404 });
    }
  } catch (error) {
    console.error('Update reocurring expense error', error);
    return NextResponse.json({
      errorType: 'serverError',
      message: 'Internal Server Error'
    });
  }

  return NextResponse.json(updatedReocurringExpense);
}

/**
 * Create a new reocurring expense
 * @param {NextRequest} request 
 * @returns {NextResponse}
 */
export async function DELETE(request, { params }) {
  const session = request.cookies.get('access-token');

  if (!session || !session?.value) {
    return NextResponse.json({
      errorType: 'auth',
      message: 'Unauthorized'
    }, { status: 401 });
  }

  const userSession = jwt.decode(session.value);

  const { id } = await params;

  let deletedReocurringExpense;
  try {
    deletedReocurringExpense = await prismaClient.reOccuringExpenses.deleteMany({
      where: {
        id: id,
        userId: userSession.userId
      },
    });

    if (deletedReocurringExpense.count === 0) {
      return NextResponse.json({
        errorType: 'notFound',
        message: 'Reocurring expense not found'
      }, { status: 404 });
    }
  } catch (error) {
    console.error('Delete reocurring expense error', error);
    return NextResponse.json({
      errorType: 'serverError',
      message: 'Internal Server Error'
    });
  }

  return NextResponse.json(deletedReocurringExpense);
}