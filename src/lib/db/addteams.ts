import { db } from "$lib";

export function handleSingle(request: Request) {
  console.log("single");
}

export function handleBulk(request: Request) {
  console.log("multiple");
}
