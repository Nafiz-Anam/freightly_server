const nodemailer = require("nodemailer");
const invoiceTemplate = require("../mailTemplate/invoiceTemplate");

/** send mail from testing account */
const signup = async (req, res) => {
    let customerEmail = req.body.emailData.email;
    // create reusable transporter object using the default SMTP transport
    // console.log("process.env.SMTP_HOST", process.env.SMTP_HOST);
    // console.log("process.env.SMTP_PORT", process.env.SMTP_PORT);
    // console.log("rocess.env.SMTP_EMAIL", process.env.SMTP_EMAIL);
    // console.log("process.env.SMTP_PASS", process.env.SMTP_PASS);
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
        to: customerEmail, // list of receivers
        subject: "Freightly Invoice", // Subject line
        // text: "Freightly Payment.", // plain text body
        html: invoiceTemplate(), // html body
    };

    transporter
        .sendMail(message)
        .then((info) => {
            return res.status(201).json({
                msg: "Invoice sent successfully.",
            });
        })
        .catch((error) => {
            return res.status(500).json({ error });
        });
};

module.exports = signup;
