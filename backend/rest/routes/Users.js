const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Users = require("../models/Users");
const bcrypt = require("bcryptjs");
const { authUser, authAdmin } = require("../middleware/Auth");
const ObjectId = require("mongodb").ObjectId;
//const { registerValidation, loginValidation } = require("../validation");

router.get("/", ...authAdmin, async (req, res) => {
  try {
    const result = await Users.find();
    return res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post("/register", async (req, res) => {
  const hashedPwd = await bcrypt.hash(req.body.password, 10);

  try {
    const duplicate = await Users.findOne({ login: req.body.login });
    if (!duplicate) {
      const newUser = await Users.create({
        name: req.body.name,
        login: req.body.login,
        password: hashedPwd,
      });
      return res.status(201).send({ newUser: newUser.id });
    }
    return res.status(401).send("This login already exists");
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await Users.findOne({ login: req.body.login });
    if (!user) return res.status(401).send("User login doesn't exists");

    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send("Invalid password");

    const token = jwt.sign({ id: user._id }, "xd");

    res.header("auth-token", token).send(token);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.delete("/:id", authUser, async (req, res) => {
  let id = { _id: ObjectId(req.params.id) };
  try {
    await Users.deleteOne(id);
    res.status(200).send("Success!");
  } catch (err) {
    res.status(500).send(err);
  }
});

router.patch("/:id/edit", authUser, async (req, res) => {
  let id = { _id: ObjectId(req.params.id) };
  let updatedValues = {
    $set: {
      name: req.body.name,
      login: req.body.login,
      password: req.body.password,
    },
  };

  try {
    await Users.updateOne(id, updatedValues);
    res.status(200).send("Updated!!!");
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get("/whoami", authUser, async (req, res) => {
  try {
    const result = await Users.findById(req.user._id);
    return res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
