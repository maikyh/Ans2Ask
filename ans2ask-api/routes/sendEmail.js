import express from 'express';
import nodemailer from 'nodemailer';
import dotenv from "dotenv";
import { google } from "googleapis";
const OAuth2 = google.auth.OAuth2;

dotenv.config();
const router = express.Router();

const USER_EMAIL = "ans2ask.meta@gmail.com"
const CLIENT_ID = "887566367231-as7lvcgmd1rih9fiahfsaki97clo1819.apps.googleusercontent.com"
const CLIENT_SECRET = "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"
const REFRESH_TOKEN = "1//04FsrUsZ8__zhCgYIARAAGAQSNwF-L9IrqUYnLkVdNMDc4gW_HZRQ_UeHiJYDwp7Paywq7sWBom2mcngd0Qvo69l1jEHhLU-pUfw"
const ACCESS_TOKEN = "ya29.a0AfB_byCnq66vue_4sP8QbJfakGEHuljK3CMY3LNeDuInm9FEsFkPxDCy73Pwd3sCWpM6hJKKa6BswijmH0tsmX7RIRrTcGtY8OFxr5_Rpx-bz2LtFBoidAmKZajYWCLpNJdEIU0S_lUTMnK4g4Gk4MVkZN78aCgYKAToSARMSFQHsvYls6wUBG1vuB4VHXPn9S7Pqpg0163"

const oauth2Client = new OAuth2(CLIENT_ID,CLIENT_SECRET);

oauth2Client.setCredentials({
    refresh_token: REFRESH_TOKEN
});

const contactAPI = async () => {
    const createTransporter = async () => {
        // const check = oauth2Client.getAccessToken();

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: USER_EMAIL,
                accessToken: ACCESS_TOKEN,
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
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
                from: USER_EMAIL,
                to: "miguelgrza.12@gmail.com",
                subject: "Ans2Ask",
                text: "Hi, this is a test email",
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
        const response = await contactAPI();

        // Return the user data in the response
        res.json("Email sent");
    } catch (error) {
        res.status(500).json({ error: 'Server error' })
    }
});


// contactAPI();
export default router;