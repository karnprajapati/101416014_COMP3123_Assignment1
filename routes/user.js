const express = require('express');
const { check, validationResult } = require("express-validator");
const User = require('../models/user');
const router = express.Router();

// Signup Route
router.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;

    // Validate incoming data
    if (!username || !email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        // Create new user without hashing the password
        let user = new User({ username, email, password });
        await user.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).json({ error: 'Error creating user', details: err.message });
    }
});

// Login Route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });

        // Compare plain text password directly (not secure)
        if (user.password !== password) return res.status(400).json({ message: 'Invalid credentials' });

        // No token generation (just a simple response)
        res.status(200).json({ message: 'Login successful' });
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).json({ error: 'Error logging in', details: err.message });
    }
});

module.exports = router;
