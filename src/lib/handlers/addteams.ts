import { currentTournament } from "$lib";
import type { RequestEvent } from "@sveltejs/kit";
import { addToArray } from "./admin";
import { teams } from "$lib/stores/teams";

export async function handleSingle({ request }: RequestEvent) {
  // Get data from request
  const data = Object.fromEntries(await request.formData()) as {
    "team-name": string;
    "team-id": string;
  };

  // Add team to tournament
  const teamName = data["team-name"];
  const teamId = data["team-id"];
  addToArray(currentTournament.teams, { name: teamName, _id: teamId });
  currentTournament.save();

  // Set list of teams
  teams.set(currentTournament.teams);
}

export function handleBulk({ request }: RequestEvent) {
  console.log("multiple");
}
