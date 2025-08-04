import bcrypt from 'bcryptjs';
import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient();

export const registerUser = async (credential) => {
  if (!credential) throw new Error(`credential object is undefined`);

  const { username, email, password, confirmPassword } = credential;

  // if one of the field is missing or have empty value
  if (!username || !email || !password || confirmPassword) {
    throw new Error(`One one these fields is missing ('username','email','password','confirmPassword')`);
  }

  // validate password and confirmPassword
  if (password !== confirmPassword) {
    return `ERROR: Make sure both password matches`;
  }

  // hash password
  const hashPassword = bcrypt.hashSync(password);

  // save data to DB
  try {
    const user = await prisma.user.create
  } catch (error) {
    return 'ERROR: Internal Server Error';
  }
}