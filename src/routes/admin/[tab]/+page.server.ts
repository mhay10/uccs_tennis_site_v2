import { currentTournament, serialize } from "$lib";
import { handleLogoutForm } from "$lib/auth.js";
import { handleAddBulk, handeAddSingle, handleRemoveSelected } from "$lib/handlers/addteams.js";
import { handleCreatePools } from "$lib/handlers/createpools.js";
import { handleCreateBrackets } from "$lib/handlers/createbrackets.js";
import { handleUpdateAllScores, handleUpdateTeamScores } from "$lib/handlers/managepools.js";
import type { RequestEvent } from "@sveltejs/kit";

export async function load({ params }: RequestEvent) {
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
  updateteamscores: handleUpdateTeamScores,
  createbrackets: handleCreateBrackets
  // populatebrackets: handlePopulateBrackets
};
