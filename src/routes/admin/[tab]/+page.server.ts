import { handleLogoutForm } from "$lib/auth.js";
import { POST } from "./+server.js";

export async function load({ params }) {
  return {
    tab: params.tab
  };
}

export const actions = {
  logout: handleLogoutForm,
  addteam: () => console.log("hello"),
  addbulk: () => console.log("goodbye")
};
