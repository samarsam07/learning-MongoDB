const express = require("express");
require("dotenv").config();
const multer = require("multer");
const pdfkit = require("pdfkit");
const fs = require("fs");
const fsPromises = require("fs").promises;
const { GoogleGenerativeAI } = require("@google/generative-ai");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

// configure the multer
const upload = multer({
  dest: "upload/",
});
app.use(express.json({ limit: "10mb" }));
// initialize the google generative AI
const genAI = new GoogleGenerativeAI("AIzaSyBdMe-a0speon50bk9egJGxbKnaPSitctM");
app.use(express.static("public"));
// route to upload the image

app.post("/analyze", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Please upload the image" });
    } else {
      const imagePath = req.file.path;
      const imageData = await fsPromises.readFile(imagePath, {
        encoding: "base64",
      });
      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
      });
      const result = await model.generateContent([
        "Analyze this plant image and provide detailed analysis of its species, health, and care recommendations, its characteristics, care instructions, and any interesting facts. Please provide the response in plain text without using any markdown formatting.",
        {
          inlineData: {
            mimeType: req.file.mimetype,
            data: imageData,
          },
        },
      ]);
      const plantInfo = result.response.text();
      await fsPromises.unlink(imagePath);
      res.json({
        message: plantInfo,
        image: `Data:${req.file.mimetype};base64,${imageData}`,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
// route to download the image
app.post("/download", async (req, res) => {
  res.json({ message: " successfully" });
});

// start the server
app.listen(port, (req, res) => {
  console.log(`Server is running on port ${port}`);
});
