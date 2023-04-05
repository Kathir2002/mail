const express = require("express")
const app = express();
const cors = require("cors")
const morgan = require("morgan")
const nodemailer = require("nodemailer")
const env = require("dotenv")
env.config()
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
let mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "testdemomailuser@gmail.com",
        pass: process.env.GMAIL_PASS
    }
})

app.post("/send-email", async (req, res) => {
    let { subject, email, content } = req.body
    console.log(subject, content);
    console.log(req.body);
    let mailOptions = {
        from: "testdemomailuser@gmail.com",
        to: "kathirmthvn@gmail.com",
        subject: "Your Details Changed",
        text: "Hai"
    }
    mailTransporter.sendMail(mailOptions, err => {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Email has sent");
        }
    })
})

app.listen(8001, () => console.log("Server Running"));