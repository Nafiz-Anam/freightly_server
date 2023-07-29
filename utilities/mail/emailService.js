const nodemailer = require("nodemailer");
const { default: invoiceTemplate } = require("../mailTemplate/invoiceTemplate");

/** send mail from testing account */
const signup = async (req, res) => {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: true,
        auth: {
            user: process.env.SMTP_EMAIL,
            pass: process.env.SMTP_PASS,
        },
    });

    let message = {
        from: process.env.SMTP_EMAIL, // sender address
        to: "nafiz.anam008@gmail.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Successfully Register with us.", // plain text body
        html: invoiceTemplate(), // html body
    };

    transporter
        .sendMail(message)
        .then((info) => {
            return res.status(201).json({
                msg: "you should receive an email",
            });
        })
        .catch((error) => {
            return res.status(500).json({ error });
        });
};

module.exports = signup;
