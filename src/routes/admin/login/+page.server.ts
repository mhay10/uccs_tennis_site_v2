import { ADMIN_USERNAME, ADMIN_PASSWORD } from "$env/static/private";
import { createAuthCookie } from "$lib/auth.js";
import { fail, redirect } from "@sveltejs/kit";
import { db } from "$lib/db/db.js";

export const actions = {
  default: async ({ cookies, request }) => {
    // Parse form data
    const formData = Object.fromEntries(await request.formData());

    // Check credentials exist
    if (!formData.username || !formData.password)
      return fail(300, { error: "Missing email or password" });

    // Check credentials are correct
    const { username, password } = formData as { username: string; password: string };
    if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD)
      return fail(500, { error: "Incorrect email or password" });

    // Set auth cookie
    const cookie = createAuthCookie();
    cookies.set(cookie.name, cookie.value, cookie.options);

    // Redirect to admin page
    throw redirect(302, "/admin");
  }
};
