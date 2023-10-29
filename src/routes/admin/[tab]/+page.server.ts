import { currentTournament } from "$lib";
import { handleLogoutForm } from "$lib/auth.js";
import { handleBulk, handleSingle } from "$lib/handlers/addteams.js";

export async function load({ params }) {
  // Get tab from params
  const { tab } = params;
  const result: any = { tab };

  // Get data for each tab
  switch (tab) {
    case "add-teams":
      result.teams = currentTournament.teams.map(({ name, _id }) => ({ name, _id }));
      break;
  }

  return result;
}

export const actions = {
  logout: handleLogoutForm,
  addteam: handleSingle,
  addbulk: handleBulk
};
