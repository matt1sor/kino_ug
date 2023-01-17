const express = require("express");
const router = express.Router();
const { authUser, authAdmin } = require("../routes/Auth");
const Movies = require("../models/Movies");
const { ObjectId } = require("mongodb");

router.get("/", authUser, authAdmin, async (req, res) => {
  try {
    const result = await Orders.find();
    return res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get("/:id", authUser, async (req, res) => {
  let id = { _id: ObjectId(req.params.id) };
  try {
    const result = await Movies.find(id);
    return res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post("/add", authUser, authAdmin, async (req, res) => {
  try {
    const duplicate = await Movies.findOne({ title: req.body.title });
    if (!duplicate) {
      const newMovie = await Movies.create({
        title: req.body.title,
        genre: req.body.genre,
        relasedate: req.body.relasedate,
        director: req.body.director,
        actors: req.body.actors,
        time: req.body.time,
        poster: req.body.poster,
        trailer: req.body.trailer,
      });
      return res.status(201).send({ newMovie: newMovie.id });
    }
    return res.status(401).send("This movie already exists");
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
