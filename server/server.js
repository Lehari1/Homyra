const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const session = require('express-session');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const pool = require('./db');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Passport config
require('./routes/passport');

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));
app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/bookings', require('./routes/bookings'));
app.use('/api/listings', require('./routes/listings'));
app.use('/api/auth', require('./routes/auth'));

// Google OAuth Start
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google OAuth Callback
app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: `${process.env.FRONTEND_URL}/login`, session: false }),
  (req, res) => {
    if (!req.user) {
      return res.redirect(`${process.env.FRONTEND_URL}/login`);
    }

    const token = jwt.sign(
      { id: req.user.id, email: req.user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    const redirectUrl = `${process.env.FRONTEND_URL}/oauth-success?token=${token}&id=${req.user.id}&name=${encodeURIComponent(req.user.full_name)}&email=${req.user.email}`;
    res.redirect(redirectUrl);
  }
);

app.get('/', (req, res) => res.send('✅ Homyra backend is running!'));

app.get('/dbtest', async (req, res) => {
  try {
    await pool.query('SELECT NOW()');
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

app.listen(PORT, () => {
  const baseUrl = process.env.BACKEND_URL || `http://localhost:${PORT}`;
  console.log(`🚀 Server running on ${baseUrl}`);
});
