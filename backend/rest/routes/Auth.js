const jwt = require("jsonwebtoken");

const authUser = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(403).send("You need to be logged in!");
  try {
    req.user = jwt.verify(token, "xd");
    next();
  } catch (err) {
    res.status(400).send("Invlaid token");
  }
};
const authAdmin = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token) {
    jwt.verify(token, "xd", (err, decoded) => {
      if (err) {
        return res.status(401).send("Invalid token");
      } else {
        if (decoded.userInfo.role !== "admin")
          return res.status(401).send("Access denied");
        next();
      }
    });
  }

  // if (!token) return res.status(403).send("You need to be logged in!");
  // try {
  //
  //   req.user = jwt.verify(token, "xd", (decode) => {
  //     req.role = decode.userInfo.role;
  //     console.log(req.role);
  //   });
  //
  //   if (req.role !== "admin") return res.status(401).send("acces denied");
  //   next();
  // } catch (err) {
  //   res.status(400).send("Invlaid token");
  // }
};

// const authAdmin = () => {
//   return (req, res, next) => {
//
//     const authHeader = req.headers.authorization || req.headers.Authorization;
//     const token = authHeader && authHeader.split(" ")[1];
//
//     if (!token) return res.status(403).send("You need to be logged in!");
//
//  //   console.log(req.user.role);
//     if (req.user.role !== "admin") {
//       res.status(401);
//       return res.send("Not allowed");
//     }
//     next();
//   };
// };

module.exports = { authUser, authAdmin };
