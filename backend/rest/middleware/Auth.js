const jwt = require("jsonwebtoken");
const User = require("../models/Users");

const authUser = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(403).send("You need to be logged in!");
  try {
    const { id } = jwt.verify(token, "xd");

    const user = await User.findById(id);

    if (!user) return res.status(404).send("User not found");

    req.user = user;
    next();
  } catch (err) {
    res.status(400).send("Invlaid token");
  }
};

const authAdmin = [
  authUser,
  (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token) {
      jwt.verify(token, "xd", async (err, decoded) => {
        if (err) {
          return res.status(401).send("Invalid token");
        }

        const user = await User.findById(decoded.id);

        if (!user || user.role !== "admin") {
          return res.status(401).send("Access denied");
        }

        next();
      });
    }
  },
];

module.exports = { authUser, authAdmin };
