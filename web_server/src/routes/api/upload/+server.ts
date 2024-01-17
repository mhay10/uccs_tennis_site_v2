import { json, type RequestEvent } from "@sveltejs/kit";
import { writeFile } from "fs/promises";

export async function POST({ request }: RequestEvent) {
	// Check that request is authorized
	const authHeader = request.headers.get("Authorization");
	if (!authHeader || authHeader !== "tfym1ch@mt")
		return json({ message: "Unauthorized" }, { status: 401 });

	// Get folder, file name and file content from request body
	const data = (await request.json()) as { folder: string; name: string; content: string }[];
	for (const image of data) {
		// Decode image from base64
		const decodedImage = Buffer.from(image.content, "base64");

		// Write image to file
		const filePath = `src/lib/uploads/${image.folder}/${image.name}.png`;
		await writeFile(filePath, decodedImage);
	}

	console.log(`Uploaded ${data.length} files`);
	// Return success
	return json({ message: "Success" });
}
