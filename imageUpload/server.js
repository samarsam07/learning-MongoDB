const express = require("express");
const multer = require("multer");
const mongoose = require("mongoose");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const app = express();
const port = 3000;
// connect to mongodb
const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://samarmohd251:fziRniuPfa4op4uX@learning.18puu.mongodb.net/image-database"
    );
    console.log("connected to the database");
  } catch (err) {
    console.log("error connecting to the database", err.message);
  }
};
// image schema
const imageSchema = new mongoose.Schema({
  url: String,
  public_id: String,
});
// image model
const Image = mongoose.model("Image", imageSchema);
// connect to the database
connectDB();
// configure cloudinary
cloudinary.config({
  api_key: "262869372652195",
  cloud_name: "dnstkclxs",
  api_secret: "06XFSTOC9bQEooAry_60TsUZxuY",
});
// configure multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "imageUpload",
    format: async (req, file) => "png", // supports promises as well
    public_id: (req, file) => file.fieldname + "_" + Date.now(),
    transformation: [{ width: 800, height: 600, crop: "fill" }],
  },
});
// create multer instance and pass the storage object to it
const upload = multer({
  storage: storage,
  limits: 1024 * 1020 * 5,
  fileFilter(req, file, cb) {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Please upload an image"), false);
    }
  },
});
// route to upload image
app.post("/upload", upload.single("file"), async (req, res) => {
  console.log(req.file);
  const uploaded = await Image.create({
    url: req.file.path,
    public_id: req.file.filename,
  });
  res.json({ message: "image uploaded successfully" ,
    uploaded,
  });
});
// route to get all images
app.get("/images",async (req,res)=>{
    try {
        const images = await Image.find();
        res.json(images);
    } catch (error) {
        console.log(error);
    }
})

// start server
app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
