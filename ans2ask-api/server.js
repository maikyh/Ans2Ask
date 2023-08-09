import express from 'express';
import session from 'express-session';
import cors from 'cors';
import morgan from 'morgan';
import { sequelize } from './database.js';
import userRoutes from './routes/users.js';
import questionRoutes from './routes/questions.js';
import answerRoutes from './routes/answers.js';
import googleScrapingRoutes from './routes/googleScraping.js';
import youtubeScrapingRoutes from './routes/youtubeScraping.js';
import cloudinaryRoutes from './routes/cloudinary.js';
import sendEmailRoutes from './routes/sendEmail.js';
import tokenRoutes from './routes/tokens.js';
import SequelizeStoreInit from 'connect-session-sequelize';
import dotenv from "dotenv";

dotenv.config();

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
app.use(questionRoutes);
app.use(answerRoutes);
app.use(googleScrapingRoutes);
app.use(youtubeScrapingRoutes);
app.use(cloudinaryRoutes);
app.use(sendEmailRoutes);
app.use(tokenRoutes);

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