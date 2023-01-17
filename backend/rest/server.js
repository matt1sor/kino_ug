const express = require("express");
const https = require("https");
const fs = require("fs");
const path = require("path");
const app = express();
const port = 5556;
const usersRouter = require("../rest/routes/Users");
const moviesRouter = require("../rest/routes/Movies");
const repertoireRouter = require("../rest/routes/Repertoire");
const orderRouter = require("../rest/routes/Orders");

require("dotenv").config({ path: "../.env" });
const cors = require("cors");
const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const ssl = https.createServer(
  {
    key: fs.readFileSync(path.join(__dirname, "cert", "klucz_nopass.pem")),
    cert: fs.readFileSync(path.join(__dirname, "cert", "certyfikat.pem")),
  },
  app
);

app.use(cors());
app.use(express.json());
app.use("/users", usersRouter);
app.use("/repertoire", repertoireRouter);
app.use("/movies", moviesRouter);
app.use("/order", orderRouter);

mongoose
  .connect("mongodb://localhost:27017/kino")
  .then(() => {
    console.log("Connected to mongoDB");
    ssl.listen(port, () => {
      console.log(`App is listening at port ${port}`);
    });
  })
  .catch((e) => console.log(e));
