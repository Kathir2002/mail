const express = require('express');
const nodemailer = require('nodemailer');
const morgan = require("morgan")
require("dotenv").config()
const app = express();
const port = 3000;

app.use(express.json());
app.use(morgan('dev'));

app.post('/send-email', async (req, res) => {
    const { subject, content } = req.body;

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: 'testdemomailuser@gmail.com',
            pass: process.env.GMAIL_PASS
        }
    });

    try {
        await transporter.sendMail({
            from: "testdemomailuser@gmail.com",
            to: to,
            subject: subject,
            text: content
        });
        res.status(200).send('Email sent successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while sending the email');
    }
});

app.listen(port, () => {
    console.log(`Server running at ${port}`);
});
