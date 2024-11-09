const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const db = require('../server');

// Login Endpoint
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    db.get('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (err, row) => {
        if (err) {
            res.status(500).json({ error: 'Database error' });
        } else if (row) {
            res.json({ role: row.role, userId: row.id });
        } else {
            res.status(401).json({ error: 'Invalid credentials' });
        }
    });
});

module.exports = router;
