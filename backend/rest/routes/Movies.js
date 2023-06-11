const express = require("express");
const router = express.Router();
const Movies = require("../models/Movies");
const { authUser, authAdmin } = require("../middleware/Auth");
const { ObjectId } = require("mongodb");

router.get("/", authUser, async (req, res) => {
  try {
    const { sortBy, dir } = req.query;

    const result = await Movies.find({}, "", {
      sort:
        sortBy && dir
          ? {
              [sortBy]: dir,
            }
          : {},
    });
    return res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get("/search", authUser, async (req, res) => {
  const { search } = req.query;
  console.log(search);
  const filters = search
    ? { title: { $regex: `.*${search}.*`, $options: "i" } }
    : { _id: null };
  try {
    const result = await Movies.find(filters);
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
      poster: req.body.poster,
      duration: req.body.duration,
    });
    return res.status(201).send(newMovie);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Failed to create the movie", err });
  }
});

router.patch("/edit/:id", ...authAdmin, async (req, res) => {
  let id = { _id: ObjectId(req.params.id) };
  let updatedValues = {
    $set: {
      title: req.body.title,
      genre: req.body.genre,
      relasedate: req.body.relasedate,
      director: req.body.director,
      duration: req.body.duration,
      poster: req.body.poster,
    },
  };

  try {
    await Movies.updateOne(id, updatedValues);
    res.status(200).send("Updated!!!");
  } catch (err) {
    res.status(500).send(err);
  }
});

router.delete("/:id", ...authAdmin, async (req, res) => {
  let id = { _id: ObjectId(req.params.id) };
  try {
    await Movies.deleteOne(id);
    res.status(200).send("Success!");
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
