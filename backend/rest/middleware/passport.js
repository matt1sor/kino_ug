const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/UsersGoogle");

module.exports = function (passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID:
          "650831453772-hqcdp23l7n4ukjqiofogtvrncaqbh29v.apps.googleusercontent.com",
        clientSecret: "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",
        callbackURL: "http://localhost:5556/auth/google/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        const newUser = {
          googleId: profile.id,
          displayName: profile.displayName,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          login: profile.displayName,
        };
        try {
          let user = await User.findOne({ googleId: profile.id });
          if (user) {
            done(null, user);
          } else {
            user = await User.create(newUser);
            done(null, user);
          }
        } catch (err) {
          console.error(err);
        }
      }
    )
  );
  passport.serializeUser((user, done) => {
    console.log("serializacja");
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    console.log("DEserializacja");
    User.findById(id, (err, user) => done(err, user));
  });
};
