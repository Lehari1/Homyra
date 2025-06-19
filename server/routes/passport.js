const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const pool = require('../db');

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser(async (id, done) => {
  const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
  done(null, result.rows[0]);
});

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: `${process.env.BACKEND_URL}/auth/google/callback`
},
async (accessToken, refreshToken, profile, done) => {
  const email = profile.emails[0].value;
  const name = profile.displayName;
  const googleId = profile.id;

  let user = await pool.query('SELECT * FROM users WHERE google_id = $1', [googleId]);

  if (user.rows.length === 0) {
    const existing = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

    if (existing.rows.length > 0) {
      await pool.query('UPDATE users SET google_id = $1 WHERE email = $2', [googleId, email]);
      user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    } else {
      user = await pool.query(
        'INSERT INTO users (full_name, email, google_id, created_at) VALUES ($1, $2, $3, NOW()) RETURNING *',
        [name, email, googleId]
      );
    }
  }

  return done(null, user.rows[0]);
}));
