import express from 'express';
import User from '../models/userModel.js';

const router = express.Router();

router.get('/user-data/:registrationNumber', async (req, res) => {
  try {
    const { registrationNumber } = req.params;
    const user = await User.findOne({ registrationNumber });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const userData = {
      registrationNumber: user.registrationNumber,
      name: user.personName,
      hostel: user.hostel,
      image: user.userImage.toString('base64'), 
    };

    res.json(userData);
  } catch (error) {
    console.error('Error fetching user data: ', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
