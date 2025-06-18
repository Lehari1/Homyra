// routes/users.js
const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET user by ID
router.get('/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT id, full_name, email FROM users WHERE id = $1', [req.params.id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error fetching user:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
