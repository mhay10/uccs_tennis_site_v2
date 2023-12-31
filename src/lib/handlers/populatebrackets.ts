import { currentTournament } from "$lib";
import type { Bracket } from "$lib/types/bracket";
import type { RequestEvent } from "@sveltejs/kit";

export async function handlePopulateBrackets({ request }: RequestEvent) {
  // Get and convert data from request
  const data = Object.fromEntries(await request.formData()) as { [key: string]: string };
  const brackets = Object.values(data).map((bracket) => JSON.parse(bracket) as Bracket);

  // Save brackets to database
  currentTournament.brackets = [];
  currentTournament.brackets.push(...brackets);
  await currentTournament.save();

  // Return success
  return {
    success: true,
    message: "Successfully populated brackets"
  };
}
