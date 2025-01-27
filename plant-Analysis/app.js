const express = require("express");
require("dotenv").config();
const multer = require("multer");
const pdfkit = require("pdfkit");
const fs = require("fs");
const fsPromises = require("fs").promises;
const { GoogleGenerativeAI } = require("@google/generative-ai");
const path = require("path");
// const { rejects } = require("assert");

const app = express();
const port = process.env.PORT || 3000;

// configure the multer
const upload = multer({
  dest: "upload/",
});
app.use(express.json({ limit: "10mb" }));
// initialize the google generative AI
const genAI = new GoogleGenerativeAI("AIzaSyAq7ic5PgsG5_FWK1JMuf_xx0YPjklRGwg");
app.use(express.static("public"));
// route to upload the image
// home route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
  });

// app.post("/analyze", upload.single("image"), async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ message: "Please upload the image" });
//     } else {
//       const imagePath = req.file.path;
//       const imageData = await fsPromises.readFile(imagePath, {
//         encoding: "base64",
//       });
//       const model = genAI.getGenerativeModel({
//         model: "gemini-1.5-flash",
//       });
//       const result = await model.generateContent([
//         "Analyze this plant image and provide detailed analysis of its species, health, and care recommendations, its characteristics, care instructions, and any interesting facts. Please provide the response in plain text without using any markdown formatting.",
//         {
//           inlineData: {
//             mimeType: req.file.mimetype,
//             data: imageData,
//           },
//         },
//       ]);
//       const plantInfo = result.response.text();
//       await fsPromises.unlink(imagePath);
//       res.json({
//         message: plantInfo,
//         image: `Data:${req.file.mimetype};base64,${imageData}`,
//       });
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });
app.post("/analyze", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No image file uploaded" });
    }

    const imagePath = req.file.path;
    const imageData = await fsPromises.readFile(imagePath, {
      encoding: "base64",
    });

    // Use the Gemini model to analyze the image
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
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

    // Clean up: delete the uploaded file
    await fsPromises.unlink(imagePath);

    // Respond with the analysis result and the image data
    res.json({
      result: plantInfo,
      image: `data:${req.file.mimetype};base64,${imageData}`,
    });
  } catch (error) {
    console.error("Error analyzing image:", error);
    res
      .status(500)
      .json({ error: "An error occurred while analyzing the image" });
  }
});
// route to download the image
app.post("/download", async (req, res) => {
  const {result, image} = req.body;
 try {
  // insure report directory exists
  const reportDir = path.join(__dirname, "report");
  await fsPromises.mkdir(reportDir, { recursive: true });
  // generate the pdf
  const filename=`plant-analysis-report-${Date.now()}.pdf`;
  const pdfPath = path.join(reportDir, filename);
  const writeStream = fs.createWriteStream(pdfPath);
  const doc=new pdfkit();
  doc.pipe(writeStream);
  doc.fontSize(20).text("Plant analysis report", {align: "center"});
  doc.moveDown();
  doc.fontSize(15).text(`date: ${new Date().toDateString()}`);
  doc.moveDown();
  doc.fontSize(14).text(result,{align: "left"});
  // insert image
  if(image){
    const base64Data = image.replace(/^data:image\/\w+;base64,/, "");
    const buffer=Buffer.from(base64Data, "base64");
    doc.moveDown();
    doc.image(buffer, {
      fit:[500,300],
      align: "center",
      valign: "center",

    });
    doc.end();
    // wait for the stream to finish
    await new Promise((resolve,reject)=>{
      writeStream.on("finish",resolve);
      writeStream.on("error",reject);
      res.download(pdfPath, filename, (err)=>{
        if(err){
         res.status(500).json({message: "Failed to download the file"});
        }
        fsPromises.unlink(pdfPath, (err)=>{
          if(err){
            console.log(err);
          }
        });
      });
    })
  }
 } catch (error) {
  console.log(error);
 }
});

// start the server
app.listen(port, (req, res) => {
  console.log(`Server is running on port ${port}`);
});
