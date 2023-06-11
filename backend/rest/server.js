const express = require("express");
const app = express();
const port = 5556;
const http = require("http");
const usersRouter = require("../rest/routes/Users");
const moviesRouter = require("../rest/routes/Movies");
const repertoireRouter = require("../rest/routes/Repertoire");
const orderRouter = require("../rest/routes/Orders");
require("dotenv").config({ path: "../.env" });
const cors = require("cors");
const mongoose = require("mongoose");

const server = http.createServer(app);
mongoose.set("strictQuery", false);

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
    server.listen(port, () => {
      console.log(`App is listening at port ${port}`);
    });
  })
  .catch((e) => console.log(e));
