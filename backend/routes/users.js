const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Hackathon = require('../models/Hackathons');
const Registration = require('../models/Registration');

// Fetch user profile
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).send('User not found');
    }
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).send('Error fetching user profile');
  }
});

// // Fetch user's registered hackathons
// router.get('/:id/hackathons', async (req, res) => {
//   try {
//     const registrations = await Registration.findAll({
//       where: { user_id: req.params.id },
//       include: [Hackathon]
//     });
//     res.status(200).json(registrations);
//   } catch (error) {
//     console.error('Error fetching user hackathons:', error);
//     res.status(500).send('Error fetching user hackathons');
//   }
// });

// Update user profile
router.put('/:id', async (req, res) => {
  try {
    const { name, email, profile_image, DOB } = req.body;
    const user = await User.findByPk(req.params.id);
    if (user) {
      user.name = name;
      user.email = email;
      user.profile_image = profile_image;
      user.DOB = DOB;
      await user.save();
      res.status(200).json(user);
    } else {
      res.status(404).send('User not found');
    }
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).send('Error updating user profile');
  }
});

module.exports = router;