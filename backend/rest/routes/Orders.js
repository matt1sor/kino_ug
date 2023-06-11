const express = require("express");
const router = express.Router();
const { authUser, authAdmin } = require("../middleware/Auth");
const Orders = require("../models/Order");
const { ObjectId } = require("mongodb");

router.get("/", ...authAdmin, async (req, res) => {
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
      seat: req.body.seat,
      formofpayment: req.body.formofpayment,
      buyer: req.user._id,
    });
    return res.status(201).send({ order_nr: newOrder._id });
  } catch (err) {
    res.status(500).send(err);
  }
});

router.patch(`/edit/:id`, ...authAdmin, async (req, res) => {
  let id = { _id: ObjectId(req.params.id) };
  let updatedValues = {
    $set: {
      movieTitle: req.body.movieTitle,
      hall: req.body.hall,
      day: req.body.day,
      time: req.body.time,
      seat: req.body.seat,
      formofpayment: req.body.formofpayment,
    },
  };

  try {
    await Orders.updateOne(id, updatedValues);
    res.status(200).send("Updated!!!");
  } catch (err) {
    res.status(500).send(err);
  }
});

router.delete("/:id", ...authAdmin, async (req, res) => {
  let id = { _id: ObjectId(req.params.id) };

  try {
    await Orders.deleteOne(id);
    res.status(200).send("Deleted!");
  } catch (err) {
    res.status(500).send(err);
  }
});

//######### statystyki

router.get("/stats/day", ...authAdmin, async (req, res) => {
  const date = req.body.day;

  try {
    const allorders = await Orders.aggregate([
      { $match: { day: new Date(date) } },
      { $count: "all orders" },
    ]);

    const sold_tickets_for_movie = await Orders.aggregate([
      { $match: { day: new Date(date) } },
      { $sortByCount: "$movieTitle" },
    ]);

    const stats = { ...allorders, sold_tickets_for_movie };

    return res.send(stats);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get("/stats/month", ...authAdmin, async (req, res) => {
  const date = req.body.day;

  try {
    const allorders = await Orders.aggregate([
      {
        $addFields: {
          month_document: { $month: "$day" },
          month_date: { $month: new Date(date) },
        },
      },
      {
        $match: { $expr: { $eq: ["$month_document", "$month_date"] } },
      },
      { $count: "all orders" },
    ]);

    const sold_tickets_for_movie = await Orders.aggregate([
      {
        $addFields: {
          month_document: { $month: "$day" },
          month_date: { $month: new Date(date) },
        },
      },
      {
        $match: { $expr: { $eq: ["$month_document", "$month_date"] } },
      },
      { $sortByCount: "$movieTitle" },
    ]);

    const stats = { ...allorders, sold_tickets_for_movie };

    return res.send(stats);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
