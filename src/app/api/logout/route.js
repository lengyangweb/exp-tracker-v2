import { NextApiRequest } from 'next';
import { NextResponse } from 'next/server';
import { killSession } from '@/lib/session';

/**
 * Log user out
 * @param {NextApiRequest} request 
 */
export async function POST(request) {
  try {
    // clear session data
    await killSession('access-token');
    return NextResponse.json({
      success: true,
      message: 'User has been logged out.'
    });
  } catch (error) {
    console.error('killSession error', error);
    NextResponse.json({
      errorType: 'serverError',
      message: 'Internal Server Error'
    }, { status: 500 });
  }
}