import jwt from "jsonwebtoken";
import prismaClient from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request) {
  const session = request.cookies.get('access-token');

  if (!session || !session?.value) {
    return NextResponse.json({
      errorType: 'auth',
      message: 'Unauthorized'
    }, { status: 401 });
  }

  const userSession = jwt.decode(session.value);

  // 1. Fetch users's expenses grouped by category and month
  // 2. Analyze expenses to generate insights
  // 3. Group by month and category to get totals
  let expenses;
  try {
    expenses = await prismaClient.histories.findMany({
      where: {
        userId: userSession.userId,
        type: 'expense'
      },
      select: {
        id: true,
        amount: true,
        category: true,
        createdAt: true,
        trackerId: true,
      },
      orderBy: { createdAt: 'desc' }
    });
  } catch (error) {
    console.error('Fetch expenses for insights error', error);
    return NextResponse.json({
      errorType: 'serverError',
      message: 'Internal Server Error'
    });
  }

  // 4. Compute insights based on fetched data
    // Group by category and month
    const grouped = expenses.reduce((acc, expense) => {
      const month = new Date(expense.createdAt).toISOString().slice(0, 7); // YYYY-MM
      if (!acc[month]) {
        acc[month] = { category: expense.category, month, total: 0 };
      }
      acc[month].total += Math.ceil(expense.amount);
      return acc;
    }, {});
  
  // json example response
  // {
  //   "totals": {
  //     "monthTotal": 1340,
  //     "categories": {
  //       "Food": 420,
  //       "Transportation": 150,
  //       "Entertainment": 220
  //     }
  //   },
  //   "insights": [
  //     "Your largest category this month is Food ($420).",
  //     "You spent 24% less compared to last month.",
  //     "You have a weekly spending pattern on Fridays."
  //   ]
  // }
  return NextResponse.json({
    expenses,
    grouped,
    totals: {
      monthTotal: 0,
      categories: {}
    },
    insights: []
  }, { status: 200 }); 
}