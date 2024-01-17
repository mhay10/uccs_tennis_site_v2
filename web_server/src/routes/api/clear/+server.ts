import { json } from "@sveltejs/kit";
import type { RequestEvent } from "./$types";
import fg from "fast-glob";
import { unlink } from "fs/promises";

export async function POST({ request }: RequestEvent) {
	// Check that request is authorized
	const authHeader = request.headers.get("Authorization");
	if (!authHeader || authHeader !== "tfym1ch@mt")
		return json({ message: "Unauthorized" }, { status: 401 });

	// Get all files in the uploads folder
	const globPattern = "src/lib/uploads/**/*.png";
	const files = await fg.glob(globPattern);

	// Delete all files
	for (const file of files) await unlink(file);

	console.log(`Deleted ${files.length} files`);

	// Return success
	return json({ message: "Success" });
}
