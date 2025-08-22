import { cookies } from "next/headers"

export const createCookies = async (name, value) => {
  try {
    const cookieStore = await cookies();
    cookieStore.set({
      name,
      value,
      httpOnly: true, // so it's not accessible via JS
      secure: true, // send only over HTTPS
      path: "/", // available across the site
      sameSite: "lax", // CSRF protection
      maxAge: 15 * 60, // 15 minutes in seconds
    });
  } catch (error) {
    throw error;
  }
}