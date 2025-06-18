const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const session = require('express-session');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const pool = require('./db');

// Load env variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Passport config
require('./routes/passport');

// Middleware
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET || 'yourSecretKey',
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
  passport.authenticate('google', { failureRedirect: 'http://localhost:5173/login', session: false }),
  (req, res) => {
    if (!req.user) {
      return res.redirect('http://localhost:5173/login');
    }

    const token = jwt.sign(
      { id: req.user.id, email: req.user.email },
      process.env.JWT_SECRET || 'fallbackSecret',
      { expiresIn: '1h' }
    );

    const redirectUrl = `http://localhost:5173/oauth-success?token=${token}&id=${req.user.id}&name=${encodeURIComponent(req.user.full_name)}&email=${req.user.email}`;
    console.log('🔁 Redirecting with user:', req.user);
    res.redirect(redirectUrl);
  }
);

app.get('/', (req, res) => res.send('✅ Homyra backend is running!'));

app.get('/dbtest', async (req, res) => {
  try {
    await pool.query('SELECT NOW()');
    res.json({ success: true });
  } catch (err) {
    console.error('DB test failed:', err);
    res.status(500).json({ success: false });
  }
});

app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));

