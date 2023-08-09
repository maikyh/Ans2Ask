import express from 'express';
import nodemailer from 'nodemailer';
import dotenv from "dotenv";
import { google } from "googleapis";
const OAuth2 = google.auth.OAuth2;

dotenv.config();
const router = express.Router();

const oauth2Client = new OAuth2(process.env.CLIENT_ID,process.env.CLIENT_SECRET);

oauth2Client.setCredentials({
    refresh_token: process.env.REFRESH_TOKEN
});

const contactAPI = async (recipient, text) => {
    const createTransporter = async () => {
        // const check = oauth2Client.getAccessToken();

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: process.env.USER_EMAIL,
                accessToken: process.env.ACCESS_TOKEN,
                clientId: process.env.CLIENT_ID,
                clientSecret: process.env.CLIENT_SECRET,
                refreshToken: process.env.REFRESH_TOKEN,
            },
        });

        try {
            return transporter;
        } catch (error) {
            console.log('Create Transport Error: ', error);
        }
    }

    const sendEmail = async () => {
        try {
            const mailOptions = {
                from: process.env.USER_EMAIL,
                to: recipient,
                subject: "Ans2Ask - Account Recovery",
                text: text,
            }

            let emailTransporter = await createTransporter();
            emailTransporter.sendMail(mailOptions, (err, data) => {
                if (err) {
                    throw err
                } else {
                    console.log("Email sent successfully", data.response);
                }
            });
        } catch (err) {
            console.log("ERROR: ", err)
        }
    };

    try {
        const response = await sendEmail();
        console.log(response);
    }
    catch (e) {
        console.log(e);
    }
}

// Route to send email
router.post('/sendEmail', async (req, res) => {
    const { recipient, text } = req.body;

    try {
        // Find the user by username
        const response = await contactAPI(recipient, text);

        // Return the user data in the response
        res.json("Email sent");
    } catch (error) {
        res.status(500).json({ error: 'Server error' })
    }
});

export default router;