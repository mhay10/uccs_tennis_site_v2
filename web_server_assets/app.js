import express from "express";
import fg from "fast-glob";
import { writeFile, unlink } from "fs/promises";

// Create a new express instance
const app = express();
const port = 3000;

// Serve static files from the public directory
app.use(express.static("public"));

// Parse JSON bodies
app.use(express.json({ limit: "300kb" }));

// Create route for uploading files
app.post("/upload", async (req, res) => {
  // Check that request is authorized
  const authHeader = req.headers.authorization;
  if (authHeader !== "tfym1ch@mt") res.status(401).send("Unauthorized");

  // Get folder, filename, and file contents from request
  const newFiles = req.body;

  // Remove old files not in request
  const oldFiles = await fg.glob("public/**/*.png");
  const toBeDeleted = oldFiles.filter((oldFile) => {
    // Get filename from path
    const oldFilename = oldFile.split("/").pop();

    // Return true if old file is not in request
    return !newFiles.some((newFile) => newFile.name === oldFilename);
  });

  // Delete old files
  for (const file of toBeDeleted) await unlink(file);

  // Save images to public folder
  for (const image of newFiles) {
    // Decode image from base64
    const decodedImage = Buffer.from(image.content, "base64");

    // Write image to file
    const filePath = `public/${image.folder}/${image.name}.png`;
    await writeFile(filePath, decodedImage);
  }

  console.log(`Uploaded ${newFiles.length} files`);

  res.send("OK");
});

// Start the server
app.listen(port, () => console.log(`Server listening on port ${port}`));
