import { currentTournament } from "$lib";
import type { RequestEvent } from "@sveltejs/kit";
import { addToArray } from "./admin";
import { teams } from "$lib/stores/teams";
import { parse } from "csv-parse/sync";

export async function handeAddSingle({ request }: RequestEvent) {
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

export async function handleAddBulk({ request }: RequestEvent) {
  // Get data from request
  const data = Object.fromEntries(await request.formData());
  const file = data["team-file"] as File;

  // Parse CSV
  const csv = parse(await file.text(), {
    columns: ["name", "_id"],
    skipEmptyLines: true,
    from_line: 2
  });

  // Add teams to tournament
  for (const team of csv) {
    addToArray(currentTournament.teams, team);
  }
  currentTournament.save();

  // Set list of teams
  teams.set(currentTournament.teams);
}

export async function handleRemoveSelected({ request }: RequestEvent) {
  // Get data from request
  const data = await request.formData();
  const selected = data.getAll("selected");

  // Remove teams from tournament
  currentTournament.teams = currentTournament.teams.filter(({ _id }) => !selected.includes(_id));
  currentTournament.save();

  // Set list of teams
  teams.set(currentTournament.teams);
}
