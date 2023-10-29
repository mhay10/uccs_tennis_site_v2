import { activeTournament, currentTournament } from "$lib";
import { handleLogoutForm } from "$lib/auth.js";
import { getActiveTournament, getTournaments } from "$lib/handlers/admin";
import { Tournament } from "$lib/models.js";
import { redirect } from "@sveltejs/kit";

export async function load({ cookies }) {
  // Check if admin is logged in
  const cookie = cookies.get("auth_token");

  // Redirect to login page if not logged in
  if (!cookie) throw redirect(302, "/admin/login");

  // Get tournaments
  const tournaments = await getTournaments(currentTournament._id);
  return {
    activeTournament: JSON.stringify(currentTournament),
    tournaments: JSON.stringify(tournaments)
  };
}

export const actions = {
  logout: handleLogoutForm,
  tournament: async ({ request }) => {
    // Get data from request
    const data = Object.fromEntries(await request.formData()) as {
      "existing-tournament-id": string;
      "tournament-name": string;
      "tournament-id": string;
    };
    const existingTournamentId = data["existing-tournament-id"];
    const tournamentName = data["tournament-name"];
    const tournamentId = data["tournament-id"];

    // If tournamentName and tournamentId are empty, use existing tournament
    if (!tournamentName && !tournamentId) {
      // Set active tournament
      const tournament = (await getActiveTournament())!;
      Object.assign(currentTournament, tournament);
    } else {
      // Create new tournament
      const tournament = new Tournament({
        _id: tournamentId,
        name: tournamentName
      });
      await tournament.save();
    }

    // Set active tournament
    activeTournament.active_tournament = tournamentId || existingTournamentId;
    activeTournament.save();

    // Redirect to add teams page
    throw redirect(302, "/admin/add-teams");
  }
};
