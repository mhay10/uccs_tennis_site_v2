import { currentTournament } from "$lib";
import { handleLogoutForm } from "$lib/auth.js";
import { handleAddBulk, handeAddSingle, handleRemoveSelected } from "$lib/handlers/addteams.js";

export async function load({ params }) {
  // Get tab from params
  const { tab } = params;

  // Get teams and pools from current tournament
  const teams = currentTournament.teams.map(({ name, _id }) => ({ name, _id }));
  const pools = currentTournament.pools.map(({ teams, _id }) => ({ _id, teams }));

  return {
    tab,
    teams,
    pools
  };
}

export const actions = {
  logout: handleLogoutForm,
  addteam: handeAddSingle,
  addbulk: handleAddBulk,
  removeselected: handleRemoveSelected
};
