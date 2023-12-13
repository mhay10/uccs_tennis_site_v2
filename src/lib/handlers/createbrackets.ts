import { currentTournament } from "$lib";
import { bracketNames } from "$lib/types/bracket";
import type { RequestEvent } from "@sveltejs/kit";

export async function handleCreateBrackets({ request }: RequestEvent) {
  // Get data from request
  const formData = Object.fromEntries(await request.formData());

  // Convert form data to JSON
  const data = {
    numBrackets: Number(formData["numBrackets"]),
    brackets: Object.keys(formData)
      .filter((key) => key !== "numBrackets")
      .map((key) => ({ [key]: Number(formData[key]) }))
  };

  // Create and save brackets
  currentTournament.brackets = [];
  for (let i = 0; i < data.numBrackets; i++) {
    // Create bracket with placeholder teams
    const numTeams = data.brackets[i][bracketNames[i]];
    const bracket = {
      _id: bracketNames[i],
      teams: Array.from({ length: numTeams }, (_, i) => ({
        _id: `temp${i + 1}`,
        name: `Temp ${i + 1}`
      })),
      scores: [],
      prebracket: true
    };

    // Add bracket to tournament
    currentTournament.brackets.push(bracket);
  }
  await currentTournament.save();
}
