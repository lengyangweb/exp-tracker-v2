import bcrypt from 'bcryptjs';
import prismaClient from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

/**
 * Create a new user
 * @param {NextRequest} request 
 * @returns {NextResponse}
 */
export async function POST(request) {
  const body = await request.json();
  if (!body || !body.username || !body.email || !body.password || !body.confirmPassword) {
    return NextResponse.json({ message: "Invalid request body" }, { status: 400 });
  }
  const { username, email, password, confirmPassword } = body;

  if (password !== confirmPassword) {
    return NextResponse.json({ 
      errorType: 'validation',
      validationField: 'confirmPassword',
      message: "Passwords do not match" 
    }, { status: 400 });
  }

  if (password.length < 12) {
    return NextResponse.json({ message: "Password must be at least 12 characters long" }, { status: 400 });
  }

  if (!/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/[0-9]/.test(password) || !/[\W_]/.test(password)) {
    return NextResponse.json({ 
      errorType: 'validation',
      validationField: 'password',
      message: "Password must include uppercase, lowercase, number, and special character" 
    }, { status: 400 });
  }

  if (username.length < 4) {
    return NextResponse.json({ 
      errorType: 'validation',
      validationField: 'username',
      message: "Username must be at least 4 characters long" 
    }, { status: 400 });
  }

  if (!/\S+@\S+\.\S+/.test(email)) {
    return NextResponse.json({ 
      errorType: 'validation',
      validationField: 'email',
      message: "Invalid email address" 
    }, { status: 400 });
  }

  // validate if user already exists
  try {
      const existingUser = await prismaClient.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        return NextResponse.json(
          { errorType: "clientError", message: "User already exists" },
          { status: 409 }
        );
      }
  } catch (error) {
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }

  // hash password using bcrypt (not shown here for brevity)
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    // create new user in the database
    await prismaClient.user.create({
      data: {
        username,
        email,
        password: hashedPassword, // Store hashed password
      },
    });
  } catch (error) {
    // log the error for debugging purposes
    console.error("Error creating user:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }

  return NextResponse.json({ message: "User created successfully" }, { status: 201 });
}