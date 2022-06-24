const express = require("express");
// const fs = require("fs");
const bodyParser = require('body-parser');

const multer = require("multer");
const upload = multer({
    limits: {
      fileSize: 16 * 1024 * 1024,
    }
  });

const { spawn } = require("child_process");
const app = express();
const port = 3003;
const Iprocessing = require('./Iprocessing');
const path = require('path');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('public'));


app.get("/image", upload.single("image"), (req, res) => {
  var dataToSend;
  // save sent jpeg as target.jpg
  const imagePath = path.join(__dirname, '/AprilTagRecognition/files');
  const fileUpload = new Iprocessing(imagePath);
  if (!req.file) {
    res.status(401).json({error: 'Please provide an image'});
  }
  const filename = fileUpload.save(req.file.buffer, "target");

  // spawn new child process to call the python script
  const python = spawn("python3", [
    "AprilTagRecognition/detection.py",
    "--image",
    "AprilTagRecognition/files/apriltags_all.png",
  ]);
  // collect data from script
  python.stdout.on("data", function (data) {
    console.log("Pipe data from python script ...");
    dataToSend = data.toString();
  });
  // in close event we are sure that stream from child process is closed
  python.on("close", (code) => {
    console.log(`child process close all stdio with code ${code}`);
    // send data to browser
    res.send(dataToSend);
  });
});
app.listen(port, () =>
  console.log(`Example app listening on port 
${port}!`)
);
