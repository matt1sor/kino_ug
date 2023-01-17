const express = require("express");
const router = express.Router();
const Repertoire = require("../models/Repertoire");
const { authUser, authAdmin } = require("../routes/Auth");
const { ObjectId } = require("mongodb");

router.get("/", authUser, async (req, res) => {
  try {
    const result = await Repertoire.find();
    return res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post("/add", authUser, authAdmin, async (req, res) => {
  try {
    const exists = await Repertoire.findOne({
      movieTitle: req.body.movieTitle,
    });
    if (!exists) {
      const newScreening = await Repertoire.create({
        movieTitle: req.body.movieTitle,
        day: req.body.day,
        time: req.body.time,
        hall: req.body.hall,
      });
      return res.status(201).send({ newScreening: newScreening.id });
    }
    return res.status(401).send("Not found in DB");
  } catch (err) {
    res.status(500).send(err);
  }
});

router.patch("/:id/edit", authUser, authAdmin, async (req, res) => {
  let id = { _id: ObjectId(req.params.id) };
  let updatedValues = {
    $set: {
      movieTitle: req.body.movieTitle,
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

router.delete("/:id", authUser, authAdmin, async (req, res) => {
  let id = { _id: ObjectId(req.params.id) };
  try {
    await Repertoire.deleteOne(id);
    res.status(200).send("Success!");
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
