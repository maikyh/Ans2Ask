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
const REFRESH_TOKEN = "1//046ZGCaP5qYnRCgYIARAAGAQSNwF-L9IrYc87icVPf81jWaF-5YBZ3GOjhAOCtkfjIp22vIuRq6pfaN7GB-5ONMbru7SzlK8GMmQ"
const ACCESS_TOKEN = "ya29.a0AfB_byBAxpFo1C6ARDZ5cj749tsz28R2GBKQwK-uZQb8jVQUpb5B_BgblKe2_a-XwjprirG0di5yWb3_1KxRJxkIsbDy6rV455aDi7dxcoQBJWDr4FTCqHWHicHTwqgXe98kUY-2fibD-2qCyPcm787ZyDfwvnAaCgYKAQESARMSFQHsvYlsgugHHw4605whp_qasf0_Fw0166"

const contactAPI = async () => {
    const createTransporter = async () => {
        const oauth2Client = new OAuth2(
            CLIENT_ID,
            CLIENT_SECRET,
            "https://developers.google.com/oauthplayground"
        );

        oauth2Client.setCredentials({
            refresh_token: REFRESH_TOKEN
        });


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

contactAPI();

/*

const USER_EMAIL = "ans2ask.meta@gmail.com"
const CLIENT_ID = "887566367231-as7lvcgmd1rih9fiahfsaki97clo1819.apps.googleusercontent.com"
const CLIENT_SECRET = "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"
const REFRESH_TOKEN = "1//046ZGCaP5qYnRCgYIARAAGAQSNwF-L9IrYc87icVPf81jWaF-5YBZ3GOjhAOCtkfjIp22vIuRq6pfaN7GB-5ONMbru7SzlK8GMmQ"
const ACCESS_TOKEN = "ya29.a0AfB_byBAxpFo1C6ARDZ5cj749tsz28R2GBKQwK-uZQb8jVQUpb5B_BgblKe2_a-XwjprirG0di5yWb3_1KxRJxkIsbDy6rV455aDi7dxcoQBJWDr4FTCqHWHicHTwqgXe98kUY-2fibD-2qCyPcm787ZyDfwvnAaCgYKAQESARMSFQHsvYlsgugHHw4605whp_qasf0_Fw0166"

curl --request POST --data "client_id=887566367231-as7lvcgmd1rih9fiahfsaki97clo1819.apps.googleusercontent.com&client_secret=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&refresh_token=1//046ZGCaP5qYnRCgYIARAAGAQSNwF-L9IrYc87icVPf81jWaF-5YBZ3GOjhAOCtkfjIp22vIuRq6pfaN7GB-5ONMbru7SzlK8GMmQ&grant_type=refresh_token" https://oauth2.googleapis.com/token
*/