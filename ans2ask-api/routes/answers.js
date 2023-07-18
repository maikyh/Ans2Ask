import express from 'express';
import { User } from '../models/index.js';
import { Answer } from '../models/answer.js';
const router = express.Router();

// Route to get all answers, with associated users
router.get('/answers', async (req, res) => {
    try {
        const answers = await Answer.findAll({
        include: [{ model: User, as: 'user' }],
        order: [['createdAt', 'DESC']]
        });
        res.json(answers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Route to create a new answer
router.post('/answers', async (req, res) => {
    try {
        // Check if user is logged in
        if (!req.session.user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        // Retrieve the current user from the session
        const currentUser = req.session.user;

        // Create the answer with the current user ID
        const answer = await Answer.create({
        ...req.body,
        userId: currentUser.id
        });

        const answerWithUser = await Answer.findOne({
        where: { id: answer.id },
        include: [{ model: User, as: 'user' }]
        });

        res.status(201).json(answerWithUser);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Route to update an answer
router.put('/answers/:id', async (req, res) => {
    try {
      // Find the answer by its ID
      const answer = await Answer.findOne({ where: { id: req.params.id } });
  
      // Check if the answer exists
      if (!answer) {
        return res.status(404).json({ error: 'Answer not found' });
      }
  
      // Update the answer
      await answer.update(req.body);
  
      res.status(200).json(answer);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  

export default router;