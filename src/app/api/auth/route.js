import bcrypt from 'bcryptjs';
import { NextApiRequest } from 'next';
import prismaClient from "@/lib/prisma";
import { generateJWT } from '@/lib/jwt';
import * as session from '@/lib/session';
import { NextResponse } from 'next/server';

/**
 * Login user
 * @param {NextApiRequest} request
 */
export async function POST(request) {
  const body = await request.json();
  const { username, password } = body;

  if (!username || !password) {
    return response.status(400).json({
      errorType: 'clientError',
      message: 'username or password is missing.'
    });
  }

  // query user
  let user;
  try {
    user = await prismaClient.user.findFirst({
      where: {
        username: username
      }
    });

    if (!user) return NextResponse.json({
      errorType: 'resourceNotFound',
      message: `User doesn't exist.`
    }, { status: 500 });

  } catch (error) {
    console.error(`Query user error`, error);
    return NextResponse.json({
      errorType: 'serverError',
      message: 'Internal Server Error'
    }, { status: 500 });
  }

  // compare password
  const passwordMatch = bcrypt.compareSync(password, user.password);
  if (!passwordMatch) return NextResponse.json({
    errorType: 'validation',
    message: 'Invalid username or password.'
  },{ status: 400 });

  // create JWT object
  let token;
  try {
    token = generateJWT({ userId: user.id });
  } catch (error) {
    console.error(`generateJWT error`, error);
    return NextResponse.json({
      errorType: 'serverError',
      message: 'Internal Server Error'
    },{ status: 500 });
  }

  // save token to cookie
  try {
    await session.createCookies('access-token', token);
  } catch (error) {
    console.error(`Fail to createCookies`, error);
    return NextResponse.json({
      errorType: 'serverError',
      message: 'Internal Server Error'
    },{ status: 500 });
  }
  
  return NextResponse.json({
    success: true,
    message: 'User login successfully!',
    user: {
      userId: user.id,
      email: user.email,
      username: user.username
    }
  });
}