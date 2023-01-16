const express = require("express");
const router = express.Router();
const Users = require("../models/Users");
const bcrypt = require("bcryptjs");

router.get("/", async (req, res) => {
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
    console.log(duplicate);
    if (!duplicate) {
      const newUser = await Users.create({
        name: req.body.name,
        login: req.body.login,
        password: hashedPwd,
      });

      return res.status(201).send(newUser);
    }
    return res.status(401).send("This login already exists");
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
