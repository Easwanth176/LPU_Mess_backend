import express from 'express';
import multer from 'multer';
import path from 'path';
import FormModel from '../models/FormModel.js';

const router = express.Router();

// Get the current directory using process.cwd()
const currentDirectory = process.cwd();

// Define a storage strategy for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(currentDirectory, 'uploads', 'pdf');
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const extname = path.extname(file.originalname);
    cb(null, uniqueSuffix + extname);
  },
});

const uploadMiddleware = multer({ storage: storage });

router.post('/submitForm', uploadMiddleware.single('Pdf'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const { Type, Topic, YoutubeLink } = req.body;

    const pdfFilePath = path.join(currentDirectory, 'uploads', 'pdf', req.file.filename);

    const newFormData = new FormModel({
      Type,
      Topic,
      YoutubeLink,
      Pdf: pdfFilePath,
    });

    await newFormData.save();

    res.status(201).json({ message: 'Form data submitted successfully' });
  } catch (error) {
    console.error('Error submitting form data:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

export default router;
