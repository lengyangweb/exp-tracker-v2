import { NextResponse, NextRequest } from "next/server";
import prismaClient from "@/lib/prisma";
import OpenAI from "openai";
import jwt from "jsonwebtoken";

/**
 * AI Assistant API Route
 * @param {NextRequest} req 
 * @returns {NextResponse}
 */
export async function POST(req) {
  try {
    // -------------------------------
    // 1. Parse body
    // -------------------------------
    const { question } = await req.json();
    if (!question) {
      return NextResponse.json(
        { error: "Missing 'question' field" },
        { status: 400 }
      );
    }

    // -------------------------------
    // 2. Get logged-in user
    // -------------------------------
    const session = req.cookies.get('access-token');

    if (!session || !session?.value) {
      return NextResponse.json({
        errorType: 'auth',
        message: 'Unauthorized'
      }, { status: 401 });
    }

    const userSession = jwt.decode(session.value);

    const userId = userSession.userId;

    // -------------------------------
    // 3. Fetch all tracker + expenses
    // -------------------------------
    const trackers = await prismaClient.tracker.findMany({
      where: { userId },
      include: {
        histories: {
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    // If no data, respond politely
    if (!trackers || trackers.length === 0) {
      return NextResponse.json({
        answer: "You have no expenses yet. Start adding some and I can help analyze them!",
      });
    }

    // -------------------------------
    // 4. Prepare a structured summary 
    // -------------------------------
    const summary = trackers.map((tracker) => {
      return {
        trackerTitle: tracker.title,
        totalTransactions: tracker.histories.length,
        totalAmount: tracker.histories.reduce(
          (acc, t) => acc + (t.type === "expense" ? t.amount : -t.amount),
          0
        ),
        histories: tracker.histories.map((t) => ({
          amount: t.amount,
          type: t.type,
          category: t.category ?? "Uncategorized",
          date: t.createdAt.toISOString(),
        })),
      };
    });

    // -------------------------------
    // 5. Send to OpenAI
    // -------------------------------
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const prompt = `
You are an AI Budget Assistant. 
Analyze the user's financial data and answer their question truthfully and concisely.

User’s Question:
"${question}"

Here is the user's spending data in JSON format:
${JSON.stringify(summary, null, 2)}

Rules:
- Base answers ONLY on the data provided.
- If something is not in the data, say you cannot determine it.
- Provide helpful financial insight when appropriate.
- Keep your tone friendly and clear.
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-4.1", // or gpt-4o or gpt-5
      messages: [
        { role: "system", content: "You are an AI financial assistant." },
        { role: "user", content: prompt },
      ],
      temperature: 0.2,
    });

    const answer =
      completion?.choices?.[0]?.message?.content ||
      "Sorry, I couldn’t generate an answer.";

    // -------------------------------
    // 6. Return answer to client
    // -------------------------------
    return NextResponse.json({ answer });
  } catch (err) {
    console.error("AI Assistant Error:", err);
    return NextResponse.json(
      { error: "Server error processing AI request." },
      { status: 500 }
    );
  }
}
