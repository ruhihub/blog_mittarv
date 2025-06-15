
const express = require('express');
const router = express.Router();
const User = require('../models/user'); // Assuming your User model is in ../models/user.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register route
router.post("/register", async (req, res) => {
    try {
        // IMPORTANT: Changed 'name' to 'username' to match your incoming request body and User model
        const { username, email, password } = req.body; 

        // Basic validation - now correctly checks for username
        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields required" });
        }

        // Check if user exists
        const existing = await User.findOne({ email });
        if (existing) {
            return res.status(400).json({ message: "Email already in use" });
        }

        // Hash password
        const hashed = await bcrypt.hash(password, 10);

        // Create user - now correctly uses 'username'
        const user = await User.create({ username, email, password: hashed });
        if (!user) {
            return res.status(500).json({ message: "Error creating user" });
        }

        // Generate JWT token
        // Ensure process.env.JWT_SECRET is set in your .env file
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        // Respond with user data and token - now uses 'username' for the 'name' field in the response
        res.json({ user: { id: user._id, name: user.username, email: user.email }, token });

    } catch (err) {
        console.error(err); // Log the detailed error to your server console
        res.status(500).json({ message: "Server error" });
    }
});


// Login route
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        // Ensure process.env.JWT_SECRET is set in your .env file
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        // IMPORTANT: Also updated here for consistency, sending user.username as 'name'
        res.json({ user: { id: user._id, name: user.username, email: user.email }, token }); 
    } catch (err) {
        console.error(err); // Log the detailed error to your server console
        res.status(500).json({ message: 'Server error' });
    }
});


// Update user bio and username
router.put("/profile", async (req, res) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) return res.status(401).json({ message: "No token provided" });
  
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const { bio, username } = req.body;
  
      const updatedFields = {};
      if (bio) updatedFields.bio = bio;
      if (username) updatedFields.username = username;
  
      const updatedUser = await User.findByIdAndUpdate(
        decoded.id,
        { $set: updatedFields },
        { new: true, runValidators: true }
      ).select("-password");
  
      res.json({
        message: "Profile updated successfully",
        user: updatedUser,
      });
    } catch (err) {
      console.error("Update profile error:", err);
      res.status(500).json({ message: "Server error" });
    }
  });
  


module.exports = router;
