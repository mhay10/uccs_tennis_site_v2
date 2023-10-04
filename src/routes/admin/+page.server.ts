import { redirect } from "@sveltejs/kit";

export async function load({ cookies }) {
  // Check if admin is logged in
  const cookie = cookies.get("auth_token");

  // Redirect to login page if not logged in
  if (!cookie) throw redirect(302, "/admin/login");

  return { loggedIn: false };
}

export const actions = {
  default: async ({ cookies }) => {
    // Delete auth cookie
    cookies.delete("auth_token");

    // Redirect to login page
    throw redirect(302, "/admin/login");
  }
};
