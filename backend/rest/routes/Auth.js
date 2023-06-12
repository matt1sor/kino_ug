const express = require("express");
const passport = require("passport");
const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);
router.get(
  "/google/callback",
  passport.authenticate("google", {
    scope: ["profile"],
    successRedirect: "/auth/google/success",
    failureRedirect: "/auth/google/failure",
  })
);

router.get("/google/success", (req, res) => {
  res.redirect("http://localhost:3000/repertoire");
});

// router.get(
//   "/google/callback",
//   passport.authenticate("google", { failureRedirect: "/", scope: ["profile"] }),
//   (req, res) => {
//     res.redirect("/repertoire");
//   }
// );

// router.get("/logout", (req, res) => {
//   req.logout();
//   res.redirect("/");
// });

router.get("/logout", (req, res, next) => {
  req.logout((error) => {
    if (error) {
      return next(error);
    }
    res.redirect("/");
  });
});
// router.get("http://localhost:3000/users/login/failed", (req, res) => {
//   res.status(401).json({
//     error: true,
//     message: "Login failure",
//   });
// });
//
// router.get(
//   "/google/callback",
//   passport.authenticate("google", {
//     successRedirect: "http://localhost:3000/repertoire",
//     failureRedirect: "http://localhost:3000/users/login/failed",
//   })
// );

module.exports = router;
