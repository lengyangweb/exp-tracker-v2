import jwt from 'jsonwebtoken';
import prismaClient from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

/**
 * Delete a trackers in the database
 * @param {NextRequest} request 
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

  const { id: trackerId } = await params;

  if (!trackerId) {
    return NextResponse.json({
      errorType: 'clientError',
      message: 'trackerId is missing from request params.'
    }, { status: 400 });
  }

  // Delete all histories related to this tracker FIRST
  try {
    await prismaClient.histories.deleteMany({ 
      where: { trackerId: trackerId, userId: userSession.userId }
    });
  } catch (error) {
    console.error('Delete tracker histories fail', error);
    return NextResponse.json({
      errorType: 'serverError',
      message: 'Internal Server Error'
    }, { status: 500 });
  }

  // Then delete the tracker
  let deleted;
  try {
    deleted = await prismaClient.tracker.delete({ 
      where: { id: trackerId, userId: userSession.userId }
    });

    if (deleted.count === 0) {
      return NextResponse.json({
        errorType: 'notFound',
        message: 'Reocurring expense not found'
      }, { status: 404 });
    }
  } catch (error) {
    console.error('Delete tracker fail', error);
    return NextResponse.json({
      errorType: 'serverError',
      message: 'Internal Server Error'
    }, { status: 500 });
  }

  return NextResponse.json(deleted, { status: 200 });
}

/**
 * Update a tracker in the database
 * @param {NextRequest} request 
 */
export async function PUT(request, { params }) {
  const session = request.cookies.get('access-token');

  if (!session || !session?.value) {
    return NextResponse.json({
      errorType: 'auth',
      message: 'Unauthorized'
    }, { status: 401 });
  }

  const userSession = jwt.decode(session.value);

  const { id: trackerId } = await params;

  if (!trackerId) {
    return NextResponse.json({
      errorType: 'clientError',
      message: 'trackerId is missing from request params.'
    }, { status: 400 });
  }

  const body = await request.json();

  let updatedRow;
  try {
    updatedRow = await prismaClient.tracker.update({ 
      where: { id: trackerId, userId: userSession.userId },
      data: body
    });

    if (updatedRow.count === 0) {
      return NextResponse.json({
        errorType: 'notFound',
        message: 'Reocurring expense not found'
      }, { status: 404 });
    }
  } catch (error) {
    console.error('Update tracker fail', error);
    return NextResponse.json({
      errorType: 'serverError',
      message: 'Internal Server Error'
    }, { status: 500 });
  }

  return NextResponse.json(updatedRow, { status: 200 });
}