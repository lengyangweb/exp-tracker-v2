import * as jwt from 'jsonwebtoken';

/**
 * Generate JWT Token with user information
 * @param {{ userId: string }} userInfo 
 * @returns {string}
 */
export const generateJWT = (userInfo) => {
  const token = jwt.sign(userInfo, process.env.JWT_SECRET, { expiresIn: '15mins' });
  return token;
}

/**@param {string} token */
export const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
}