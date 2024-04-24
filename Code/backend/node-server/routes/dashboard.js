// routes/profile.js

const express = require('express');
const router = express.Router();
const User = require('../models/User');
const verifyToken = require('../utils/verifyToken');



// Update profile route
router.post('/chat',verifyToken,  async (req, res) => {
  try {
    const { firstName, lastName, birthDate } = req.body;
    const userEmail = req.user.email; // Assuming you're using authentication middleware to attach user information to the request object

    // Find the user by ID
    const user = await User.findOne({email : userEmail});

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }


    // Update user profile fields
    user.firstName = firstName;
    user.lastName = lastName;
    user.birthDate = birthDate;

    // Save the updated user
    await user.save();

    return  res.status(200).json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Something went wrong' });
  }
});




module.exports = router;
