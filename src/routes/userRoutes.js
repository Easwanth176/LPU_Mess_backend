import express from 'express';
import multer from 'multer';
import User from '../models/userModel.js';

const router = express.Router();
const upload = multer();

router.post('/submit', upload.single('userImage'), async (req, res) => {
  try {
    const { registrationNumber, personName, hostel } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: 'Please upload a user image.' });
    }

    const userImage = req.file.buffer;
    const newUser = new User({
      registrationNumber,
      personName,
      hostel,
      userImage,
    });

    await newUser.save();

    res.json(newUser); 
  } catch (error) {
    console.error('Error adding user to the database:', error);
    res.status(500).json({ error: 'An error occurred while adding the user to the database.' });
  }
});


router.get('/checkUser/:registrationNumber', async (req, res) => {
  const registrationNumber = req.params.registrationNumber;
  const exists = await User.exists({ registrationNumber });
  res.json({ exists });
});

router.get('/userDetails/:registrationNumber', async (req, res) => {
  const registrationNumber = req.params.registrationNumber;
  const user = await User.findOne({ registrationNumber });
  res.json(user);
});




export default router;
