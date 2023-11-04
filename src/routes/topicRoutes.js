import express from 'express';
const router = express.Router();
import FormModel from '../models/FormModel.js';

router.get('/topics', async (req, res) => {
  try {
    const topics = await FormModel.find();
    res.json(topics);
  } catch (error) {
    console.error('Error fetching topics:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

router.put('/topics/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const topic = await FormModel.findById(id);

    if (!topic) {
      return res.status(404).json({ message: 'Topic not found' });
    }

    // Update the completion status in the database
    topic.isDone = req.body.isDone;
    await topic.save();

    res.json(topic);
  } catch (error) {
    console.error('Error updating topic:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

export default router;
