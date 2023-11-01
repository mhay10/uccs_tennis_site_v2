import { currentTournament } from "$lib";
import { handleLogoutForm } from "$lib/auth.js";
import { getTournaments, handleNewTournament, handleExistingTournament } from "$lib/handlers/admin";
import { redirect } from "@sveltejs/kit";

export async function load({ cookies }) {
  // Check if admin is logged in
  const cookie = cookies.get("auth_token");

  // Redirect to login page if not logged in
  if (!cookie) throw redirect(302, "/admin/login");

  // Get tournaments
  // FIXME: The tournament has to be selected twice before it is set as active
  const tournaments = await getTournaments(currentTournament._id);
  return {
    currentTournament: currentTournament.toObject(),
    tournaments: tournaments.map((t) => t.toObject())
  };
}

export const actions = {
  logout: handleLogoutForm,
  existingtournament: handleExistingTournament,
  newtournament: handleNewTournament
};
