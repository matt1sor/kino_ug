const express = require("express");
const https = require("https");
const fs = require("fs");
const path = require("path");
const app = express();
const port = 5112;
const cors = require("cors");
const mongoose = require("mongoose");
const ssl = https.createServer(
  {
    key: fs.readFileSync(path.join(__dirname, "cert", "klucz_nopass.pem")),
    cert: fs.readFileSync(path.join(__dirname, "cert", "certyfikat.pem")),
  },
  app
);

app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/kino")
  .then(() => {
    console.log("Connected to mongoDB");
    ssl.listen(port, () => {
      console.log(`App is listening at port ${port}`);
    });
  })
  .catch((e) => console.log(e));
