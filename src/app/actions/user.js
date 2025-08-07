'use server'

import bcrypt from 'bcryptjs';
import prismaClient from '@/lib/prisma';

export const login = async (credential) => {
  if (!credential) return `credential object is undefined`;

  const { username, password } = credential;

  // query user
  let user;
  try {
    user = await prismaClient.user.findFirst({
      where: {
        username: username
      }
    });
    if (!user) return `ERROR: user doesn't exist`;
  } catch (error) {
    return 'Error: Internal Server Error';
  }

  // compare password
  const passwordMatch = bcrypt.compareSync(password, user.password);
  if (!passwordMatch) return `ERROR: Incorrent username or password.`

  return `SUCCESS: You're logged in!`;
  
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
    await prismaClient.user.create({
      data: {
        username,
        email,
        password: hashPassword
      },
    });
    return `SUCCESS: User has been created.`;
  } catch (error) {
    console.error('Create user error:', error);
    return `ERROR: Internal Server Error`;
  }
}

