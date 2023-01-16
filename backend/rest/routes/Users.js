const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Users = require("../models/Users");
const bcrypt = require("bcryptjs");
const { authUser, authAdmin } = require("../routes/Auth");
//const { registerValidation, loginValidation } = require("../validation");

router.get("/", authUser, authAdmin, async (req, res) => {
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

    const token = jwt.sign(
      { userInfo: { _id: user._id, role: user.role } },
      "xd"
    );

    res.header("auth-token", token).send(token);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
