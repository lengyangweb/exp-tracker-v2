import jwt from 'jsonwebtoken';
import prismaClient from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

/**
 * Get histories for a tracker
 * @param {NextRequest} request 
 * @param {*} param1 
 * @returns {NextResponse}
 */
export async function GET(request, { params }) {
  const session = request.cookies.get('access-token');

  // Check for authentication
  if (!session || !session?.value) {
    return NextResponse.json({
      errorType: 'auth',
      message: 'Unauthorized'
    }, { status: 401 });
  }

  // Decode user session from JWT
  const userSession = jwt.decode(session.value);

  const { trackerId } = await params;

  // Validate trackerId presence
  if (!trackerId) {
    return NextResponse.json({
      errorType: 'clientError',
      message: 'trackerId is missing from request params.'
    }, { status: 400 });
  }

  let histories;

  try {
    // Fetch histories from the database for the given tracker and user
    histories = await prismaClient.histories.findMany({
      where: { trackerId, userId: userSession.userId },
      orderBy: { createdAt: 'desc' }
    });
  } catch (error) {
    console.error('Fetch histories fail', error);
    return NextResponse.json({
      errorType: 'serverError',
      message: 'Internal Server Error'
    }, { status: 500 });
  }

  return NextResponse.json({
    success: true,
    data: histories
  }, { status: 200 });
}

/**
 * Create a new history entry for a tracker
 * @param {NextRequest} request 
 * @param {*} param1 
 * @returns {NextResponse}
 */
export async function POST(request, { params }) {
  const session = request.cookies.get('access-token');

  // Check for authentication
  if (!session || !session?.value) {
    return NextResponse.json({
      errorType: 'auth',
      message: 'Unauthorized'
    }, { status: 401 });
  }

  // Decode user session from JWT
  const userSession = jwt.decode(session.value);

  const { trackerId } = await params;

  // Validate trackerId presence
  if (!trackerId) {
    return NextResponse.json({
      errorType: 'clientError',
      message: 'trackerId is missing from request params.'
    }, { status: 400 });
  }

  const { title, amount, type, category, historyDate } = await request.json();

  let newHistory;

  try {
    // Create a new history entry in the database
    newHistory = await prismaClient.histories.create({
      data: {
        trackerId,
        title: title,
        userId: userSession.userId,
        amount,
        type,
        category,
        historyDate: historyDate ? new Date(historyDate) : new Date()
      }
    });
  } catch (error) {
    console.error('Create history fail', error);
    return NextResponse.json({
      errorType: 'serverError',
      message: 'Internal Server Error'
    }, { status: 500 });
  }

  return NextResponse.json({
    success: true,
    data: newHistory
  }, { status: 201 });
}

/**
 * Delete a history entry
 * @param {NextRequest} request 
 * @param {*} param1 
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

  const { trackerId: historyId } = await params;

  // Validate historyId presence
  if (!historyId) {
    return NextResponse.json({
      errorType: 'clientError',
      message: 'historyId is missing from request params.'
    }, { status: 400 });
  }

  // Delete the history entry from the database
  try {
    await prismaClient.histories.delete({ 
      where: { id: historyId, userId: userSession.userId }
    });
  } catch (error) {
    console.error('Delete history fail', error);
    return NextResponse.json({
      errorType: 'serverError',
      message: 'Internal Server Error'
    }, { status: 500 });
  }

  return NextResponse.json({
      success: true,
      message: 'History deleted.'
    }, { status: 200 }
  );
}