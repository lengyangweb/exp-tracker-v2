import jwt from "jsonwebtoken";
import prismaClient from "@/lib/prisma";
import { NextResponse } from "next/server";

/**
 * Get insights based on user's expenses
 * @param {*} request 
 * @returns {NextResponse} JSON response with insights data
 */
export async function GET(request) {
  const session = request.cookies.get("access-token");

  if (!session || !session?.value) {
    return NextResponse.json(
      {
        errorType: "auth",
        message: "Unauthorized",
      },
      { status: 401 }
    );
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
        type: "expense",
        // historyDate is this month
        historyDate: {
          gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
          lt: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1),
        },
      },
      select: {
        id: true,
        amount: true,
        category: true,
        createdAt: true,
        trackerId: true,
        historyDate: true,
      },
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Fetch expenses for insights error", error);
    return NextResponse.json({
      errorType: "serverError",
      message: "Internal Server Error",
    });
  }

  // 4. Compute insights based on fetched data
  // Group by category and month
  const grouped = expenses.reduce(
    (acc, expense) => {
      if (!expense.hasOwnProperty("historyDate")) return acc;

      if (!acc.categories.hasOwnProperty(expense.category)) {
        acc.categories[expense.category] = expense.amount;
      } else {
        acc.categories[expense.category] += expense.amount;
      }

      acc.monthTotal += expense.amount;
      return acc;
    },
    { monthTotal: 0, categories: {} }
  );

  if (grouped.monthTotal > 0) {
    grouped.monthTotal = parseFloat(grouped.monthTotal.toFixed(2));
  }

  if (Object.keys(grouped.categories).length > 0) {
    for (const category in grouped.categories) {
      grouped.categories[category] = parseFloat(
        grouped.categories[category].toFixed(2)
      );
    }
  }

  let insights = [];

  // get highest spent category
  const sortedCategories = Object.entries(grouped.categories).sort(
    (a, b) => b[1] - a[1]
  );
  const highestCategory = sortedCategories.length > 0 ? sortedCategories[0] : null;
  insights.push(
    highestCategory
      ? `Your largest category this month is ${highestCategory[0]} ($${commatedNumber(highestCategory[1])}).`
      : "No expenses recorded this month."
  );

  // compare with last month
  const lastMonthExpenses = await prismaClient.histories.findMany({
    where: {
      userId: userSession.userId,
      type: "expense",
      historyDate: {
        gte: new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1),
        lt: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
      },
    },
    select: {
      amount: true,
    },
  });

  const lastMonthTotal = lastMonthExpenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );
  
  if (lastMonthTotal > 0) {
    const percentChange =
      ((grouped.monthTotal - lastMonthTotal) / lastMonthTotal) * 100;
    const changeText = percentChange >= 0 ? "more" : "less";
    insights.push(
      `You spent ${Math.abs(percentChange).toFixed(
        2
      )}% ${changeText} compared to last month.`
    );
  } else {
    insights.push("No expenses recorded last month for comparison.");
  }

  // weekly spending pattern (simplified example)
  const dayCounts = {};
  expenses.forEach((expense) => {
    const day = expense.historyDate.getDay(); // 0 (Sun) to 6 (Sat)
    if (!dayCounts[day]) dayCounts[day] = 0;
    dayCounts[day] += expense.amount;
  });

  const maxDay = Object.entries(dayCounts).sort((a, b) => b[1] - a[1])[0];
  if (maxDay) {
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    insights.push(
      `You have a weekly spending pattern on ${daysOfWeek[maxDay[0]]}s.`
    );
  }

  return NextResponse.json(
    {
      totals: grouped,
      insights: insights,
    },
    { status: 200 }
  );
}

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

  const commatedNumber = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }