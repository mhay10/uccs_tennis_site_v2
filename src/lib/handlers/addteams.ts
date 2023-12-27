import { currentTournament } from "$lib";
import type { RequestEvent } from "@sveltejs/kit";
import { addToArray } from "./admin";
import { parse } from "papaparse";

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
  await currentTournament.save();
}

export async function handleAddBulk({ request }: RequestEvent) {
  // Get data from request
  const data = Object.fromEntries(await request.formData());
  const file = data["team-file"] as File;

  // Parse CSV
  const text = await file.text();
  const csv = parse(text, {
    skipEmptyLines: false,
    header: true
    // @ts-ignore
  }).data.slice(0, -1) as { "Team Name": string; "Team ID": string }[];

  // Add teams to tournament
  for (const team of csv) {
    addToArray(currentTournament.teams, { name: team["Team Name"], _id: team["Team ID"] });
  }
  await currentTournament.save();

  // Return success
  return {
    success: true,
    message: "Teams added successfully"
  };
}

export async function handleRemoveSelected({ request }: RequestEvent) {
  // Get data from request
  const data = await request.formData();
  const selected = data.getAll("selected");

  // Remove teams from tournament
  currentTournament.teams = currentTournament.teams.filter(({ _id }) => !selected.includes(_id));
  await currentTournament.save();

  // Return success
  return {
    success: true,
    message: "Teams removed successfully"
  };
}
