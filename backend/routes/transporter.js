const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({
    // Configure your email provider here
    service: "gmail",
    auth: {
        user: process.env.OTP_EMAIL,
        pass: process.env.OTP_EMAIL_PASSWORD,
    },
    tls: {
        rejectUnauthorized: false,
    },
});

module.exports = transporter