import { currentTournament, serialize } from "$lib";

export async function load() {
  const teams = serialize(currentTournament.teams);
  const pools = serialize(currentTournament.pools);

  return { teams, pools };
}
