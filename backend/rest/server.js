const express = require("express");
const app = express();
const port = 5556;
const http = require("http");
const passport = require("passport");
require("./middleware/passport")(passport);
const session = require("express-session");
// const MongoStore = require("connect-mongo")(session);
const usersRouter = require("../rest/routes/Users");
const moviesRouter = require("../rest/routes/Movies");
const repertoireRouter = require("../rest/routes/Repertoire");
const orderRouter = require("../rest/routes/Orders");
const authRouter = require("../rest/routes/Auth");
require("dotenv").config({ path: "../.env" });
const cors = require("cors");
const mongoose = require("mongoose");

const server = http.createServer(app);
mongoose.set("strictQuery", false);
//
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     methods: "GET,POST,PUT,DELETE,PATCH",
//     credentials: true,
//   })
// );

app.use(
  session({
    secret: "BAW",
    resave: false,
    saveUninitialized: false,
    // store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);
app.use(cors());
app.use(express.json());
app.use("/users", usersRouter);
app.use("/repertoire", repertoireRouter);
app.use("/movies", moviesRouter);
app.use("/order", orderRouter);
app.use("/auth", authRouter);

//sessions
//
// app.use(
//   session({
//     secret: "BAW",
//     resave: false,
//     saveUninitialized: false,
//   })
// );

//Passpoert middleware
app.use(passport.initialize());
app.use(passport.session());

mongoose
  .connect("mongodb://localhost:27017/kino")
  .then(() => {
    console.log("Connected to mongoDB");
    server.listen(port, () => {
      console.log(`App is listening at port ${port}`);
    });
  })
  .catch((e) => console.log(e));
