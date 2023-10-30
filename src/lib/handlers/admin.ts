import { ActiveTournament, Tournament } from "$lib/models";
import type { RequestEvent } from "@sveltejs/kit";

export async function getActiveTournament() {
  const activeTournament = (await ActiveTournament.findById("ballin"))!;
  const tournament = await Tournament.findById(activeTournament.active_tournament);
  return tournament;
}

export async function getTournaments(activeTournamentId: string, includeActive = false) {
  const tournaments = await Tournament.find(
    includeActive ? {} : { _id: { $ne: activeTournamentId } }
  );
  return tournaments;
}

export function addToArray(array: any[], item: any, identifier = "_id") {
  const existing = array.find((i) => i[identifier] === item[identifier]);
  if (existing) Object.assign(existing, item);
  else array.push(item);
}

export async function handleSelectExistingTournament({ request }: RequestEvent) {}

export async function handleCreateNewTournament({ request }: RequestEvent) {}
