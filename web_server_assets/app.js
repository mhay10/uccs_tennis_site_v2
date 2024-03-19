import express from "express";
import fg from "fast-glob";
import { writeFile, unlink } from "fs/promises";
import cors from "cors";
import sharp from "sharp";

// Create a new express instance
const app = express();
const port = 3000;

// Serve static files from the public directory
app.use(
  express.static("public", {
    setHeaders: (res) => {
      res.set("Access-Control-Allow-Origin", "*");
    },
  })
);

// Parse JSON bodies
app.use(express.json({ limit: "5mb" }));

// Enable CORS
app.use(cors());

// Create route for uploading files
app.post("/upload", async (req, res) => {
  // Check that request is authorized
  const authHeader = req.headers.authorization;
  if (authHeader !== "tfym1ch@mt") res.status(401).send("Unauthorized");
  else {
    // Get folder, filename, and file contents from request
    const newFiles = req.body;
    if (Object.keys(newFiles).length === 0) res.status(400).send("Bad Request");
    else {
      // Remove old files not in request
      const oldFiles = await fg.glob("public/**/*.png");
      const toBeDeleted = oldFiles.filter((oldFile) => {
        // Get filename from path
        const oldFilename = oldFile.split("/").pop();

        // Return true if old file is not in requests
        return !newFiles.some((newFile) => newFile.name === oldFilename);
      });

      // Delete old files
      for (const file of toBeDeleted) await unlink(file);

      // Save images to public folder
      for (const image of newFiles) {
        // Decode image from base64
        const decodedImage = Buffer.from(image.content, "base64");

        // Resize image based on image type
        let width, height;
        switch (image.folder) {
          case "poolplay":
            if (/\d+$/.test(image.name)) {
              width = 343;
              height = 88;
            } else {
              width = 992;
              height = 218;
            }
            break;
          case "bracketplay:
            width = 1228;
            height = 753;
            break;
          case "schedule":
            if (image.name === "upcomingMatches") {
              width = 192;
              height = 832;
            } else {
              width = 243;
              height = 462;
            }
            break;
        }
        const resizedImage = await sharp(decodedImage)
          .resize(width, height, { fit: "inside" })
          .toBuffer();

        // Write image to file
        const filePath = `public/${image.folder}/${image.name}.png`;
        await writeFile(filePath, resizedImage);
      }

      console.log(`Uploaded ${newFiles.length} files`);

      res.send("OK");
    }
  }
});

// Start the server
app.listen(port, () => console.log(`Server listening on port ${port}`));
