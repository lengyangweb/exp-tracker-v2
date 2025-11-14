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

  const { id: trackerId } = params;

  if (!trackerId) {
    return NextResponse.json({
      errorType: 'clientError',
      message: 'trackerId is missing from request params.'
    }, { status: 400 });
  }

  try {
    await prismaClient.tracker.delete({ 
      where: { id: trackerId, userId: userSession.userId }
    });
  } catch (error) {
    console.error('Delete tracker fail', error);
    return NextResponse.json({
      errorType: 'serverError',
      message: 'Internal Server Error'
    }, { status: 500 });
  }

  // Also delete all histories related to this tracker
  try {
    await prismaClient.history.deleteMany({ 
      where: { trackerId: trackerId, userId: userSession.userId }
    });
  } catch (error) {
    console.error('Delete tracker histories fail', error);
    return NextResponse.json({
      errorType: 'serverError',
      message: 'Internal Server Error'
    }, { status: 500 });
  }

  return NextResponse.json({
    success: true,
    message: 'Tracker deleted.'
  }, { status: 200 });
}