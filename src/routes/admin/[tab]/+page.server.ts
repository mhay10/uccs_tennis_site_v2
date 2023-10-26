import { handleLogoutForm } from "$lib/auth.js";
import { handleBulk, handleSingle } from "$lib/handlers/addteams.js";

export async function load({ params }) {
  return {
    tab: params.tab
  };
}

export const actions = {
  logout: handleLogoutForm,
  addteam: handleSingle,
  addbulk: handleBulk
};
