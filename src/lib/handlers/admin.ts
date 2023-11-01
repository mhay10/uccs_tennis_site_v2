import { activeTournament, currentTournament } from "$lib";
import { ActiveTournament, Tournament } from "$lib/models";
import { fail, type RequestEvent } from "@sveltejs/kit";

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

export async function handleExistingTournament({ request }: RequestEvent) {
  // Get data from request
  const data = Object.fromEntries(await request.formData()) as { "tournament-id": string };

  // Get tournament
  const tournament = (await Tournament.findById(data["tournament-id"]))!;

  // Set tournament as active
  activeTournament.active_tournament = tournament._id;
  await activeTournament.save();

  // Change to selected tournament
  Object.assign(currentTournament, tournament);
  await currentTournament.save();
}

export async function handleNewTournament({ request }: RequestEvent) {
  // Get data from request
  const data = Object.fromEntries(await request.formData()) as {
    "tournament-id": string;
    "tournament-name": string;
  };

  // Check if tournament already exists
  const existingTournament = await Tournament.findById(data["tournament-id"]);
  if (existingTournament) return fail(400, { message: "Tournament already exists" });

  // Create new tournament
  const tournament = new Tournament({
    _id: data["tournament-id"],
    name: data["tournament-name"]
  });
  await tournament.save();

  // Set tournament as active
  activeTournament.active_tournament = tournament._id;
  await activeTournament.save();

  // Change to selected tournament
  Object.assign(currentTournament, tournament);
  await currentTournament.save();
}
