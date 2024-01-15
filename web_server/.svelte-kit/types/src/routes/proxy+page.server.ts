// @ts-nocheck
import type { Actions, RequestEvent } from "./$types";
import { fileTypeFromBuffer } from "file-type";
import { writeFile } from "fs/promises";

export const actions = {
	default: async ({ request }: RequestEvent) => {
		// Check if request is authorized
		const authHeader = request.headers.get("Authorization");
		if (!authHeader || authHeader !== "tfym1ch@mt")
			// Return error if not authorized
			return { success: false, message: "Unauthorized" };

		// Get file and destination folder from request
		const data = await request.formData();
		const file = data.get("file") as File | null;
		const folder = data.get("folder") as string | null;

		// Check if file and folder exist
		if (file && folder) {
			// Get file type
			const fileBuffer = await file.arrayBuffer();
			const fileType = await fileTypeFromBuffer(fileBuffer);

			// Check if file type is valid
			const acceptedTypes = ["image/jpeg", "image/png"];
			const validFileType = fileType && acceptedTypes.includes(fileType.mime);

			// Check if folder is valid
			const acceptedFolders = ["schedule", "poolplay", "bracketplay"];
			const validFolder = acceptedFolders.includes(folder);

			// Save if file type and folder are valid
			if (validFileType && validFolder) {
				const fileName = `src/lib/uploads/${folder}/${file.name}`;
				await writeFile(fileName, Buffer.from(fileBuffer));

				return { success: true, fileName };
			} else
				return {
					success: false,
					message: "Invalid file type or folder"
				};
		}

		// Return error if file or folder not found
		return { success: false, message: "File or folder not found" };
	}
};
;null as any as Actions;