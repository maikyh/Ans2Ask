import express from 'express';
import nodemailer from 'nodemailer';
import dotenv from "dotenv";
import { google } from "googleapis";
const OAuth2 = google.auth.OAuth2;

dotenv.config();
const router = express.Router();

const USER_EMAIL = "ans2ask.meta@gmail.com"

const CLIENT_ID = "887566367231-i9fsa8im14bth9n37ifs3sujclchqkmq.apps.googleusercontent.com"

const CLIENT_SECRET = "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"

const REFRESH_TOKEN = "1//04m8YeueIV7WdCgYIARAAGAQSNwF-L9IrOcG7lcC1HGh0XLhp2yXr9Sd-NIJoIcSNWkcY46xhkEOy9mJFstyITn4kU4d7SJ2ETKo"

const ACCESS_TOKEN = "ya29.a0AfB_byA7edntDtr0qPIfbsl7WmZ53ljk101yLIX88TvUZDT9QjDBJ-w6wtEdOUxyqMWxpKqAh8ElA2ZtErtEM15ftlPWgeTMUXGXsbIEQfZO3W2dBrGWl5jBNXTdmY-lUItd602ITUqjWfra7HzvhhoCl8cTaCgYKAUESARMSFQHsvYlseBZiijj7eZ9LO-4SdRe3eg0163"

const contactAPI = async () => {
    const oauth2Client = new OAuth2(
        CLIENT_ID,
        CLIENT_SECRET,
        "https://developers.google.com/oauthplayground"
    );

    oauth2Client.setCredentials({
        refresh_token: REFRESH_TOKEN
    });

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
        subject: "Test",
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
  catch(e) {
    console.log(e);
  }
}

contactAPI();

/*

Client id: 887566367231-i9fsa8im14bth9n37ifs3sujclchqkmq.apps.googleusercontent.com

Client Secret: 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

Refresh token: 1//04xPsJyL6yZxqCgYIARAAGAQSNwF-L9IrtL0D1bLGkV32cVU0FXRr-LI0selUkNyfnxv_iKre5JQtnjgwqGotnNNrUS3EWLVB9O8

Access token: ya29.a0AfB_byDH2txx1XVlRUMg5_AI7PXdyltAxxy1QNN5qe_ojDjV7HeKui8RCA2HC3E_4x3NSSLFZyBpvfmIChGDwhLBc5w-HmqdsL2ggnm0NArGpW9uTVWIF7ZrMF-Wfrbpr2VwR9eXMCNY_ko0wu63u3eY8H1SaCgYKAR8SARMSFQHsvYlseIw3qQ6WvrIdKv8b8p2GnA0163

*/