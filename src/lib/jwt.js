import * as jwt from 'jsonwebtoken';

export const generateJWT = (userInfo) => {
  const token = jwt.sign(userInfo, process.env.JWT_SECRET, { expiresIn: '15mins' });
  return token;
}

export const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
}