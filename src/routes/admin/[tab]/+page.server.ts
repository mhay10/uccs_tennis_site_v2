import { currentTournament, serialize } from "$lib";
import { handleLogoutForm } from "$lib/auth.js";
import { handleAddBulk, handeAddSingle, handleRemoveSelected } from "$lib/handlers/addteams.js";
import { handleCreatePools } from "$lib/handlers/createpools.js";
import { handleUpdateAllScores, handleUpdateTeamScores } from "$lib/handlers/managepools.js";

export async function load({ params }) {
  // Get tab from params
  const { tab } = params;

  // Get teams and pools from current tournament
  const teams = serialize(currentTournament.teams);
  const pools = serialize(currentTournament.pools);

  return { tab, teams, pools };
}

export const actions = {
  logout: handleLogoutForm,
  addteam: handeAddSingle,
  addbulk: handleAddBulk,
  removeselected: handleRemoveSelected,
  createpools: handleCreatePools,
  updateallpools: handleUpdateAllScores,
  updateteamscores: handleUpdateTeamScores
};
