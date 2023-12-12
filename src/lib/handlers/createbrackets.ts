import type { Team } from "$lib/types/teams";
import type { RequestEvent } from "@sveltejs/kit";

export const bracketNames = ["Gold Bracket", "Silver Bracket", "Bronze Bracket", "Copper Bracket"];

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

  // Create brackets
  const brackets = [];
  for (let i = 0; i < data.numBrackets; i++) {
    const numTeams = data.brackets[i][bracketNames[i]];

    brackets.push({
      name: bracketNames[i],
      teams: Array.from({ length: numTeams }, (_, i) => ({
        _id: i.toString(),
        name: `Temp ${i + 1}`
      })),
      scores: []
    });
  }

  console.log(JSON.stringify(brackets, null, 2));
}
