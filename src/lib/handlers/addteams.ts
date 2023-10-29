import { currentTournament } from "$lib";
import type { RequestEvent } from "@sveltejs/kit";
import { addToArray } from "./admin";
import { teams } from "$lib/stores/teams";
import { parse } from "csv-parse/sync";

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

export async function handleBulk({ request }: RequestEvent) {
  const data = Object.fromEntries(await request.formData());
  const file = data["team-file"] as File;

  const csv = parse(await file.text(), {
    columns: ["name", "_id"],
    skipEmptyLines: true,
    from_line: 2
  });

  for (const team of csv) {
    addToArray(currentTournament.teams, team);
  }
  currentTournament.save();
}
