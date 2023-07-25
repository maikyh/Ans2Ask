import express from 'express';
import { User } from '../models/index.js';
import { Question } from '../models/question.js';
const router = express.Router();

// Route to get all questions, with associated users
router.get('/questions', async (req, res) => {
    try {
      const questions = await Question.findAll({
        include: [{ model: User, as: 'user' }],
        order: [['createdAt', 'DESC']]
      });
      res.json(questions);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
// Route to get a specific question, with associated users
router.get('/questions/:id', async (req, res) => {
    try {
        const question = await Question.findByPk(req.params.id, {
        include: [{ model: User, as: 'user' }],
        order: [['createdAt', 'DESC']]
        });
        if (!question) {
        return res.status(404).json({ message: 'Question not found' });
        }
        res.json(question);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
  
// Route to create a new question
router.post('/questions', async (req, res) => {
    try {
        // Check if user is logged in
        if (!req.session.user) {
        return res.status(401).json({ error: 'Unauthorized' });
        }

        // Retrieve the current user from the session
        const currentUser = req.session.user;

        // Create the question with the current user ID
        const question = await Question.create({
        ...req.body,
        userId: currentUser.id
        });

        const questionWithUser = await Question.findOne({
        where: { id: question.id },
        include: [{ model: User, as: 'user' }]
        });

        res.status(201).json(questionWithUser);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Route to increase the user interaction (clicks) of a specific question
router.put('/questions/:id', async (req, res) => {
  const { id } = req.params; // Get the user ID from the request parameters

  try {
    const existingQuestion = await Question.findByPk(id);
    
    if (!existingQuestion) {
      return res.status(404).json({ message: 'Question not found' });
    }

    existingQuestion.clicks = existingQuestion.clicks = 1;

    await existingQuestion.save();

    res.json(existingQuestion);
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
});

export default router;