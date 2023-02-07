const express = require("express");
const router = express.Router();
const Repertoire = require("../models/Repertoire");
const { authUser, authAdmin } = require("../middleware/Auth");
const { ObjectId } = require("mongodb");

router.get("/", authUser, async (req, res) => {
  try {
    const { sortBy, dir } = req.query;
    const result = await Repertoire.find({}, "", {
      sort:
        sortBy && dir
          ? {
              [sortBy]: dir,
            }
          : {},
    }).populate("movieId");

    return res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get("/bydate", authUser, async (req, res) => {
  try {
    const date = req.body.date;
    const result = await Repertoire.find({ day: date }).populate("movieId");

    return res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post("/add", ...authAdmin, async (req, res) => {
  try {
    const newScreening = await Repertoire.create({
      movieId: req.body.movieId,
      day: req.body.day,
      time: req.body.time,
      hall: req.body.hall,
    });
    return res.status(201).send({ newScreening: newScreening.id });
  } catch (err) {
    res.status(500).send(err);
  }
});

router.patch(`/edit/:id`, ...authAdmin, async (req, res) => {
  let id = { _id: ObjectId(req.params.id) };
  let updatedValues = {
    $set: {
      day: req.body.day,
      time: req.body.time,
      hall: req.body.hall,
    },
  };

  try {
    await Repertoire.updateOne(id, updatedValues);
    res.status(200).send("Updated!!!");
  } catch (err) {
    res.status(500).send(err);
  }
});

router.delete("/:id", ...authAdmin, async (req, res) => {
  let id = { _id: ObjectId(req.params.id) };

  try {
    await Repertoire.deleteOne(id);
    res.status(200).send(id);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
