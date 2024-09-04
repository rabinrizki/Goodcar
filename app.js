if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}
const express = require("express");
const app = express();
const errorHandler = require("./middlewares/errorHandler");
const cors = require("cors");
const fs = require("fs");
const multer = require("multer");

const upload = multer({ dest: "images/" });

const router = require("./routers/router");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

// app.use('/images', express.static('images'))
app.get("/images/:imageName", (req, res) => {
    // do a bunch of if statements to make sure the user is
    // authorized to view this image, then

    const imageName = req.params.imageName;
    const readStream = fs.createReadStream(`images/${imageName}`);
    readStream.pipe(res);
});

app.post("/api/images", upload.single("image"), (req, res) => {
    const imageName = req.file.filename;
    const description = req.body.description;

    // Save this data to a database probably

    console.log(description, imageName);
    res.send({ description, imageName });
});
app.use("/images", express.static("images"));
app.use("/", router);

app.use(errorHandler);

module.exports = app;
