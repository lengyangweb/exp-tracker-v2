'use server'

import prismaClient from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export const login = async (credential) => {
  if (!credential) return `credential object is undefined`;
}

export const registerUser = async (credential) => {
  if (!credential) throw new Error(`credential object is undefined`);

  const { username, email, password, confirmPassword } = credential;

  // if one of the field is missing or have empty value
  if (!username || !email || !password || !confirmPassword) {
    throw new Error(`One one these fields is missing ('username','email','password','confirmPassword')`);
  }

  // validate password and confirmPassword
  if (password !== confirmPassword) {
    return `ERROR: Passwords mismatch.`;
  }

  // hash password
  const hashPassword = bcrypt.hashSync(password);

  // save data to DB
  try {
    const user = await prismaClient.user.create({
      data: {
        username,
        email,
        password: hashPassword
      },
    });
    console.log('user', user);
    return `SUCCESS: User has been created.`;
  } catch (error) {
    console.error('Create user error:', error);
    return `ERROR: Internal Server Error`;
  }
}

