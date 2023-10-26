import { db } from "$lib";
import type { RequestEvent } from "@sveltejs/kit";

export function handleSingle({ request }: RequestEvent) {
  console.log("single");
}

export function handleBulk({ request }: RequestEvent) {
  console.log("multiple");
}
