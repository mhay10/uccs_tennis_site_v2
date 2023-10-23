import { handleBulk, handleSingle } from "$lib/db/addteams.js";
import { error, json } from "@sveltejs/kit";

export async function POST({ request }) {
  // Handle the request
  if (request.url.endsWith("?/addsingle")) handleSingle(request);
  else if (request.url.endsWith("?/addbulk")) handleBulk(request);
  else throw error(400, "Invalid request");

  // Return success if no errors
  return json(undefined);
}
