import { cookies } from "next/headers"

/**
 * Create cookie
 * 
 * Ths cookie only persist for 15 minutes.
 * @param {String} name 
 * @param {String} value 
 */
export const createCookies = async (name, value) => {
  if (!name || !value) throw new Error(`name or value can't be undefined.`);

  try {
    const cookieStore = await cookies();
    cookieStore.set({
      name,
      value,
      httpOnly: true, // so it's not accessible via JS
      secure: true, // send only over HTTPS
      path: "/", // available across the site
      sameSite: "lax", // CSRF protection
      // maxAge: 15 * 60, // 15 minutes in seconds
      maxAge: 60 * 60, // 1 hour in seconds
    });
  } catch (error) {
    throw error;
  }
}

/**
 * Clear user token
 */
export const killSession = async(name) => {
  if (!name) throw new Error(`name is undefined`);

  try {
    const cookieStore = await cookies();
    cookieStore.delete(name);
  } catch (error) {
    throw error;
  }
}