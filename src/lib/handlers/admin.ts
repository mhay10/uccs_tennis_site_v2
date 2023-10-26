import { ActiveTournament, Tournament } from "$lib/models";
import { db } from "$lib";

export async function getActiveTournament() {
  const activeTournament = await ActiveTournament.findById("ballin");
  if (activeTournament) {
    const tournament = await Tournament.findById(activeTournament?.active_tournament);
    return tournament?.toObject();
  }

  return null;
}

export async function getTournaments(activeTournamentId: string, includeActive = false) {
  const tournaments = await Tournament.find(
    includeActive ? {} : { _id: { $ne: activeTournamentId } }
  );
  return tournaments.map((t) => t.toObject());
}
