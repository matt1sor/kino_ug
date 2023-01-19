const express = require("express");
const router = express.Router();
const Movies = require("../models/Movies");
const { authUser, authAdmin } = require("../middleware/Auth");
const { ObjectId } = require("mongodb");

router.get("/", authUser, async (req, res) => {
  try {
    const result = await Movies.find();
    return res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get("/:id", authUser, async (req, res) => {
  try {
    const result = await Movies.findById(req.params.id);
    return res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post("/add", ...authAdmin, async (req, res) => {
  try {
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
    return res.status(201).send(newMovie);
  } catch (err) {
    res.status(500).send({ message: "Failed to create the movie", err });
  }
});

router.patch("/:id/edit", authUser, authAdmin, async (req, res) => {
  let id = { _id: ObjectId(req.params.id) };
  let updatedValues = {
    $set: {
      title: req.body.title,
      genre: req.body.genre,
      relasedate: req.body.relasedate,
      director: req.body.director,
      actors: req.body.actors,
      time: req.body.time,
      poster: req.body.poster,
      trailer: req.body.trailer,
    },
  };

  try {
    await Movies.updateOne(id, updatedValues);
    res.status(200).send("Updated!!!");
  } catch (err) {
    res.status(500).send(err);
  }
});

router.delete("/:id", authUser, authAdmin, async (req, res) => {
  let id = { _id: ObjectId(req.params.id) };
  try {
    await Movies.deleteOne(id);
    res.status(200).send("Success!");
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
