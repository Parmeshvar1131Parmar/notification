const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const db = require("../config/database");

// Configure Passport to use local strategy for authentication
passport.use(
  new LocalStrategy((username, password, done) => {
    // Query the database to find user by username
    db.query(
      "SELECT * FROM users WHERE username = ?",
      [username],
      (error, results, fields) => {
        if (error) {
          return done(error);
        }
        // If user not found
        if (!results || results.length === 0) {
          return done(null, false, { message: "Incorrect username" });
        }
        const user = results[0];
        // Check if password matches
        if (user.password !== password) {
          return done(null, false, { message: "Incorrect password" });
        }
        // Authentication successful
        return done(null, user);
      }
    );
  })
);

// Serialize user into session
passport.serializeUser((user, done) => {
  done(null, user.id); // Store user ID in session
});

// Deserialize user from session
passport.deserializeUser((id, done) => {
  // Query the database to fetch user by ID
  db.query(
    "SELECT * FROM users WHERE id = ?",
    [id],
    (error, results, fields) => {
      if (error) {
        return done(error);
      }
      const user = results[0];
      done(null, user); // Attach user to req.user
    }
  );
});
