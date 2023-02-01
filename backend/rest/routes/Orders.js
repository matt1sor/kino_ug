const express = require("express");
const router = express.Router();
const { authUser, authAdmin } = require("../middleware/Auth");
const Orders = require("../models/Order");
const { ObjectId } = require("mongodb");
const fs = require("fs");

router.get("/", authUser, authAdmin, async (req, res) => {
  try {
    const result = await Orders.find();
    return res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get("/:id", authUser, async (req, res) => {
  let id = { buyer: ObjectId(req.params.id) };
  try {
    const result = await Orders.find(id);
    return res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post("/add", authUser, async (req, res) => {
  try {
    const newOrder = await Orders.create({
      movieTitle: req.body.movieTitle,
      hall: req.body.hall,
      day: req.body.day,
      time: req.body.time,
      buyer: req.user._id,
    });

    const logs = {
      Buyer: req.user.login,
      Movie: req.body.movieTitle,
      date: new Date(),
    };
    const strlogs = JSON.stringify(logs);
    fs.appendFile("../rest/logs.txt", strlogs + ", ", (err) => {
      if (err) {
        throw new Error(err);
      }
      console.log("Order saved into file");
    });

    return res.status(201).send(newOrder);
  } catch (err) {
    res.status(500).send(err);
  }
});

// TO EDIT
router.patch(`/edit/:id`, authUser, authAdmin, async (req, res) => {
  let id = { _id: ObjectId(req.params.id) };
  let updatedValues = {
    $set: {
      day: req.body.day,
      time: req.body.time,
      hall: req.body.hall,
    },
  };

  try {
    await Orders.updateOne(id, updatedValues);
    res.status(200).send("Updated!!!");
  } catch (err) {
    res.status(500).send(err);
  }
});

router.delete("/:id", authUser, authAdmin, async (req, res) => {
  let id = { _id: ObjectId(req.params.id) };

  try {
    await Orders.deleteOne(id);
    res.status(200).send(id);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
