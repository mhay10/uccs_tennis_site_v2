import type { RequestEvent } from "@sveltejs/kit";

export async function handleUpdateScores({ request }: RequestEvent) {
  const data = await request.formData();
  console.log(data);
}
