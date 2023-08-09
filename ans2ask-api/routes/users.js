import express from 'express';
import bcrypt from 'bcrypt';
import { User } from '../models/user.js';
import { Op } from 'sequelize';

const router = express.Router();

// Route for user registration
router.post('/users', async (req, res) => {
    const { username, password, email, title, about, coins } = req.body;

    try {
        // Check if username or email already exists
        const existingUser = await User.findOne({
            where: {
                [Op.or]: [{ username }, { email }]
            }
        });

        if (existingUser) {
            return res.status(400).json({ error: 'Username or email already exists' });
        }

        // Encrypt the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = await User.create({ username, password: hashedPassword, email, title, about, coins });

        // Set the user in the session
        req.session.user = newUser;

        // Return the user data in the response
        res.json({ user: newUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Route for updating user data
router.put('/users/:id', async (req, res) => {
    const { id } = req.params; // Get the user ID from the request parameters
    const { username, title, about, coins } = req.body;

    try {
        // Check if the user with the given ID exists
        const existingUser = await User.findByPk(id);

        if (!existingUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Update the user's data
        existingUser.username = username;
        existingUser.title = title;
        existingUser.about = about;
        existingUser.coins = coins;

        // Save the updated user
        await existingUser.save();

        // Return the updated user data in the response
        res.json({ user: existingUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Route for updating password
router.put('/users/updatePassword/:id', async (req, res) => {
    const { id } = req.params; // Get the user ID from the request parameters
    const { password } = req.body;

    try {
        // Check if the user with the given ID exists
        const existingUser = await User.findByPk(id);

        if (!existingUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Encrypt the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Update the user's data
        existingUser.password = hashedPassword;

        // Save the updated user
        await existingUser.save();

        // Return the updated user data in the response
        res.json({ user: existingUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Route for user login
router.post('/users/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Find the user by username
        const user = await User.findOne({ where: { username } });

        if (!user) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        // Compare the password
        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        // Set the user in the session
        req.session.user = user;

        // Return the user data in the response
        res.json({ user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Route to get all users
router.get('/users', async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Route to get a user by id
router.get('/users/:id', async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Route to get username if user exist
router.post('/users/verify', async (req, res) => {
    const { usernameOrEmail } = req.body;

    const username = usernameOrEmail;
    const email = usernameOrEmail;

    try {
        // Check if username or email already exists
        const existingUser = await User.findOne({
            where: {
                [Op.or]: [{ username }, { email }]
            }
        });

        if (!existingUser) {
            return res.status(400).json({ error: "Username or email isn't related to any account" });
        }

        // Return the user email in the response
        res.json({email: existingUser.email});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

export default router;