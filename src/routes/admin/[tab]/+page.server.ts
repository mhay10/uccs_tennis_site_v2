import { handleLogoutForm } from "$lib/auth.js";
import { POST } from "./+server.js";

export async function load({ params }) {
  return {
    tab: params.tab
  };
}

export const actions = {
  logout: handleLogoutForm,
  addteams_single: async ({ request }) => {
    const data = Object.fromEntries(await request.formData());
    console.log(data);
  }
};