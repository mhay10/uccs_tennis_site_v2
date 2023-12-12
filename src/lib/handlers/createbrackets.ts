import type { RequestEvent } from "@sveltejs/kit";

export const bracketNames = ["Gold Bracket", "Silver Bracket", "Bronze Bracket", "Copper Bracket"];

export async function handleCreateBrackets({ request }: RequestEvent) {
  // Get data from request
  const data = await request.formData();
  console.log(data);
}
