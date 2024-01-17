import { json, type RequestEvent } from "@sveltejs/kit";
import fg from "fast-glob";
import { writeFile, unlink } from "fs/promises";

export async function POST({ request }: RequestEvent) {
	// Check that request is authorized
	const authHeader = request.headers.get("Authorization");
	if (!authHeader || authHeader !== "tfym1ch@mt")
		return json({ message: "Unauthorized" }, { status: 401 });

	// Get folder, file name and file content from request body
	const newFiles = (await request.json()) as { folder: string; name: string; content: string }[];

	// Remove old files not in request body
	const oldFiles = await fg.glob("src/lib/uploads/**/*.png");
	const toBeDeleted = oldFiles.filter((oldFile) => {
		// Get file name from path
		const oldFileName = oldFile.substring(oldFile.lastIndexOf("/") + 1, oldFile.lastIndexOf("."));

		// Return true if file name is not in request body
		return !newFiles.find((newFile) => newFile.name === oldFileName);
	});

	// Delete files
	for (const file of toBeDeleted) await unlink(file);

	// Save images to file
	for (const image of newFiles) {
		// Decode image from base64
		const decodedImage = Buffer.from(image.content, "base64");

		// Write image to file
		const filePath = `src/lib/uploads/${image.folder}/${image.name}.png`;
		await writeFile(filePath, decodedImage);
	}

	console.log(`Uploaded ${newFiles.length} files`);
	// Return success
	return json({ message: "Success" });
}
