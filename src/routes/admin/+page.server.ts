import { handleLogoutForm } from "$lib/auth.js";
import { getActiveTournament, getTournaments } from "$lib/handlers/admin";
import { redirect } from "@sveltejs/kit";

export async function load({ cookies }) {
  // Check if admin is logged in
  const cookie = cookies.get("auth_token");

  // Redirect to login page if not logged in
  if (!cookie) throw redirect(302, "/admin/login");

  const activeTournament = await getActiveTournament();
  if (activeTournament) {
    const tournaments = await getTournaments(activeTournament?._id);

    return { activeTournament, tournaments };
  }

  return { activeTournament: null, tournaments: [] };
}

export const actions = {
  logout: handleLogoutForm
};
