import express from 'express';
import session from 'express-session';
import cors from 'cors';
import morgan from 'morgan';
import { sequelize } from './database.js';
import { User, Question, Answer } from './models/index.js';
import userRoutes from './routes/users.js';
import userQuestions from './routes/questions.js';
import SequelizeStoreInit from 'connect-session-sequelize';

const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json()); // Middleware for parsing JSON bodies from HTTP requests
app.use(morgan())

const SequelizeStore = SequelizeStoreInit(session.Store);
const sessionStore = new SequelizeStore({
  db: sequelize
});

// Session middleware
app.use(
  session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
      sameSite: false,
      secure: false,
      expires: new Date(Date.now() + (365 * 24 * 60 * 60 * 1000)) // 1 year in milliseconds
    }
  })
);

sessionStore.sync();

app.use(userRoutes);
app.use(userQuestions);

// Route to get all answers, with associated users
app.get('/answers', async (req, res) => {
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
app.post('/answers', async (req, res) => {
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

sequelize.sync({ alter: true })
  .then(() => {
    const port = 3001;
    app.listen(port, () => {
      console.log(`App is listening on port ${port}`);
    });
  })
  .catch(error => {
    console.error('Unable to connect to the database:', error);
});