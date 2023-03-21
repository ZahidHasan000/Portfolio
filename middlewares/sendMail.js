// const nodemailer = require("nodemailer");
// import {createTransport} from "nodemailer"

const createTransport = require("nodemailer");

// Receive a userMessage
const sendMail = async (text) => {
    const transporter = createTransport({
        host: process.env.SMPT_HOST,
        port: process.env.SMPT_PORT,
        auth: {
            user: process.env.SMPT_USER,
            pass: process.env.SMPT_PASSWORD
        }
    });

    await transporter.sendMail({
        subject: "Contact request from portfolio",
        to: process.env.MY_MAIL_B,
        from: process.env.MY_MAIL_B,
        text
    })
};

module.exports = sendMail;


