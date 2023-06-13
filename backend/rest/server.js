const express = require("express");
const app = express();
const port = 5556;
const http = require("http");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo");
require("./middleware/passport")(passport);
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

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
    credentials: true,
  })
);

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true },
    store: MongoStore.create({ mongoUrl: "mongodb://localhost:27017/kino" }),
  })
);
app.use(express.json());
app.use("/users", usersRouter);
app.use("/repertoire", repertoireRouter);
app.use("/movies", moviesRouter);
app.use("/order", orderRouter);
app.use("/auth", authRouter);

//Passpoert middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(passport.authenticate("session"));

mongoose
  .connect("mongodb://localhost:27017/kino")
  .then(() => {
    console.log("Connected to mongoDB");
    server.listen(port, () => {
      console.log(`App is listening at port ${port}`);
    });
  })
  .catch((e) => console.log(e));
