
import jwt from "jsonwebtoken";
import prismaClient from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

/**
 * Get monthly spending data for a given year.
 * @param {NextRequest} request 
 * @returns 
 */
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const year = parseInt(searchParams.get("year")) || new Date().getFullYear();
  // const userId = searchParams.get("userId");

  const session = request.cookies.get('access-token');

  if (!session || !session?.value) {
    return NextResponse.json({
      errorType: 'auth',
      message: 'Unauthorized'
    }, { status: 401 });
  }

  const userSession = jwt.decode(session.value);

  const start = new Date(year, 0, 1);
  const end = new Date(year + 1, 0, 1);

  let histories;
  try {
    histories = await prismaClient.histories.findMany({
      where: {
        userId: userSession.userId,
        type: "expense",
        historyDate: {
          gte: start,
          lt: end,
        },  
      },
      select: {
        amount: true,
        historyDate: true,
      },
    });
  } catch (error) {
    console.error("Database query error:", error);
    return NextResponse.json({
      errorType: 'database',
      message: 'Failed to retrieve data'
    }, { status: 500 });  
  }

  const monthlySpending = Array(12).fill(0);

  histories.forEach(({ amount, historyDate }) => {
    const month = historyDate.getMonth();
    monthlySpending[month] += amount;
  });

  const result = MONTHS.map((month, index) => ({
    month,
    total: monthlySpending[index].toFixed(2),
  }));

  return NextResponse.json({ year, monthlySpending: result });
}