const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET all listings
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM listings ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching listings:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/listings/host/:host_id
router.get('/host/:host_id', async (req, res) => {
  const { host_id } = req.params;
  const result = await pool.query('SELECT * FROM listings WHERE host_id = $1', [host_id]);
  res.json(result.rows);
});

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
// GET /api/listings/search?location=&checkIn=&checkOut=&guests=
router.get('/search', async (req, res) => {
  const { location, checkIn, checkOut } = req.query;

  try {
    const result = await pool.query(`
      SELECT * FROM listings
      WHERE LOWER(location) LIKE LOWER($1)
        AND available_from <= $2
        AND available_to >= $3
    `, [
      `%${location || ''}%`,
      checkIn || '3000-01-01',
      checkOut || '1000-01-01'
    ]);

    res.json(result.rows);
  } catch (err) {
    console.error('Search error:', err);
    res.status(500).json({ message: 'Search failed' });
  }
});


// GET listing by ID
router.get('/:id', async (req, res) => {
  const result = await pool.query('SELECT * FROM listings WHERE id = $1', [req.params.id]);
  res.json(result.rows[0]);
});



// POST new listing
router.post('/', async (req, res) => {
  const {
    title,
    location,
    price,
    description,
    image,
    host_id,
    amenities,
    available_from,
    available_to
  } = req.body;

  try {
    await pool.query(
      `INSERT INTO listings 
       (title, location, price, description, image, host_id, amenities, available_from, available_to)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
      [
        title,
        location,
        price,
        description,
        image,
        host_id,
        amenities,
        available_from,
        available_to
      ]
    );

    res.status(201).json({ message: 'Listing created' });
  } catch (err) {
    console.error('Error creating listing:', err);
    res.status(500).json({ message: 'Creation failed' });
  }
});

// PUT /api/listings/:id
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const {
    title,
    location,
    price,
    description,
    image,
    amenities,
    available_from,
    available_to
  } = req.body;

  try {
    await pool.query(
      `UPDATE listings SET 
        title = $1,
        location = $2,
        price = $3,
        description = $4,
        image = $5,
        amenities = $6,
        available_from = $7,
        available_to = $8
      WHERE id = $9`,
      [
        title,
        location,
        price,
        description,
        image,
        amenities,
        available_from,
        available_to,
        id
      ]
    );

    res.sendStatus(200);
  } catch (err) {
    console.error('Error updating listing:', err);
    res.status(500).json({ message: 'Update failed' });
  }
});

// DELETE listing
router.delete('/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM listings WHERE id = $1', [req.params.id]);
    res.json({ message: 'Listing deleted' });
  } catch (err) {
    console.error('Delete error:', err);
    res.status(500).json({ message: 'Delete failed' });
  }
});

module.exports = router;
