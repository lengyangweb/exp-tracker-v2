import jwt from 'jsonwebtoken';
import prismaClient from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

/**
 * Get all trackers in the database
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
    result = await prismaClient.tracker.findMany({
      where: {
        userId: userSession.userId
      },
      select: {
        id: true,
        title: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'desc' }
    });
  } catch (error) {
    console.error('Find all trackers error', error);
    return NextResponse.json({
      errorType: 'serverError',
      message: 'Internal Server Error'
    });
  }

  return NextResponse.json(result);
}

/**
 * Create a new user
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

  if (!body?.title) {
    return NextResponse.json({
      errorType: 'clientError',
      message: "Missing title field from request body."
    }, 400);
  }

  // validate if title already exist
  try {
      const trackerExist = await prismaClient.tracker.findFirst({
        where: { 
          title: body.title,
          userId: userSession.userId
        },
      });
      if (trackerExist) {
        return NextResponse.json({
          errorType: 'resourseAlreadyExist',
          success: false,
          message: 'Tracker already exist, please provide a new name.'
        });
      }
  } catch (error) {
    console.error(`Check tracker exist error:`, error);
    return NextResponse.json({
      errorType: 'serverError',
      message: "Internal Server Error"
    });
  }

  let newTracker;
  try {
    // create new user in the database
    newTracker = await prismaClient.tracker.create({
      data: {
        title: body.title,
        userId: userSession.userId,
        createdAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    // log the error for debugging purposes
    console.error("Error creating user:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }

  return NextResponse.json(newTracker, { status: 201 });
}