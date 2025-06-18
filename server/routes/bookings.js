const express = require('express');
const router = express.Router();
const pool = require('../db');

// POST new booking
router.post('/', async (req, res) => {
  const { listing_id, user_id, check_in, check_out, guests } = req.body;

  try {
    await pool.query(`
      INSERT INTO bookings (listing_id, user_id, check_in, check_out, guests)
      VALUES ($1, $2, $3, $4, $5)
    `, [listing_id, user_id, check_in, check_out, guests]);

    res.status(201).json({ message: 'Booking confirmed' });
  } catch (err) {
    console.error('Booking error:', err);
    res.status(500).json({ message: 'Booking failed' });
  }
});

// GET /api/bookings?user_id=2
// GET /api/bookings?user_id=2
router.get('/', async (req, res) => {
  const { user_id } = req.query;

  try {
    const result = await pool.query(`
      SELECT b.*, l.title, l.image, l.location 
      FROM bookings b
      JOIN listings l ON b.listing_id = l.id
      WHERE b.user_id = $1
      ORDER BY b.check_in DESC
    `, [user_id]);

    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching bookings:", err);
    res.status(500).json({ message: "Error retrieving bookings" });
  }
});
module.exports = router;
