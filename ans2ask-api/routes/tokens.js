import express from 'express';
import { User } from '../models/index.js';
import { Token } from '../models/token.js';
import { Op } from 'sequelize';

const router = express.Router();

// Route to get all tokens, with associated users
router.get('/tokens', async (req, res) => {
    try {
        const tokens = await Token.findAll({
            include: [{ model: User, as: 'user' }],
            order: [['createdAt', 'DESC']]
        });
        res.json(tokens);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Route to check if a token exist, with associated user
router.get('/tokens/verify/:token', async (req, res) => {
    const token = req.params.token;
    
    try {
        const tokenToVerify = await Token.findOne({where: { token }});

        res.json(tokenToVerify);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Route to create a new token
router.post('/tokens', async (req, res) => {
    try {
        // Check if user is logged in
        if (!req.session.user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        // Retrieve the current user from the session
        const currentUser = req.session.user;

        // Create the question with the current user ID
        const token = await Token.create({
            ...req.body,
            userId: currentUser.id
        });

        res.status(201).json(token);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Route to delete a token
router.delete('/tokens', async (req, res) => {
    const { token } = req.body;

    try {
        const tokenToDelete = await Token.destroy({ where: { token } });

        res.status(201).json("Token deleted");
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;