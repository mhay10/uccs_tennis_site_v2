import mime from "mime";

// Valid settings for CSV parsing
export const TEAM_HEADERS = ["Team Name", "Team ID"];
export const POOL_HEADERS = Array.from({ length: 32 }, (_, i) => `Pool ${i + 1}`);
const VALID_MIMETYPES = ["text/csv", "application/csv", "text/plain"];

// Validates the file type of the uploaded CSV
export async function validateCSV(file: File, headers: string[]) {
  // Check mimetype
  const mimetype = mime.getType(file.name);
  const validMimetype = mimetype && VALID_MIMETYPES.includes(mimetype);

  // Check file headers
  const text = await file.text();
  const firstRow = text.split("\n")[0];
  const fileHeaders = firstRow.split(",").map((header) => header.trim());
  const validHeaders =
    fileHeaders.length <= headers.length && fileHeaders.every((header, i) => header === headers[i]);

  if (validHeaders && validMimetype) return true;

  return false;
}
