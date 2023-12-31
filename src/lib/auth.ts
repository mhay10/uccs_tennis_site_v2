import { redirect, type RequestEvent } from "@sveltejs/kit";

const COOKIE_VALUE = "uttercruelcrowdshelfcreeplunchunclebrandtasteexactnightnobleindexsweep";

export function createAuthCookie() {
  // Set cookie expiration date to 12 hours
  const now = new Date();
  const halfDay = 12 * 60 * 60 * 1000;
  const expires = new Date(now.getTime() + halfDay);

  // Return cookie data
  return {
    name: "auth_token",
    value: COOKIE_VALUE,
    options: {
      expires,
      path: "/"
    }
  };
}

export function getAuthCookie(cookieString: string) {
  // Get cookie string
  const cookie = cookieString.split(";").find((cookie) => cookie.trim().startsWith("auth_token="));

  // Return token
  return cookie ? cookie.split("=")[1] : null;
}

export function checkCookieValue(str: string) {
  return str === COOKIE_VALUE;
}

export function handleLogoutForm({ cookies }: RequestEvent) {
  // Delete auth cookie
  cookies.delete("auth_token");

  // Redirect to login page
  throw redirect(302, "/admin/login");
}
