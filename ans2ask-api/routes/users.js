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

export default router;