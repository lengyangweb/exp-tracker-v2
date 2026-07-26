import jwt from "jsonwebtoken";
import prismaClient from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request) {
  const session = request.cookies.get("access-token");

  if (!session?.value) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const userSession = jwt.decode(session.value);

  if (!userSession?.userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);

  try {
    const expenses = await prismaClient.histories.findMany({
      where: {
        userId: userSession.userId,
        type: "expense",
        historyDate: {
          gte: monthStart,
          lt: nextMonth,
        },
      },
      select: {
        amount: true,
        category: true,
      },
    });

    const totalSpent = expenses.reduce((sum, item) => sum + Number(item.amount || 0), 0);

    const grouped = expenses.reduce((acc, expense) => {
      const category = expense.category || "Uncategorized";
      const amount = Number(expense.amount || 0);
      acc[category] = (acc[category] || 0) + amount;
      return acc;
    }, {});

    const breakdown = Object.entries(grouped)
      .map(([category, amount]) => ({
        category,
        amount: Number(amount.toFixed(2)),
        percentage: totalSpent > 0 ? Number(((amount / totalSpent) * 100).toFixed(1)) : 0,
      }))
      .sort((a, b) => b.amount - a.amount);

    return NextResponse.json({ breakdown, totalSpent: Number(totalSpent.toFixed(2)) });
  } catch (error) {
    console.error("Fetch category breakdown error", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
