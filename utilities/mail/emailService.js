const nodemailer = require("nodemailer");

/** send mail from testing account */
const signup = async (req, res) => {
    let customerEmail = req.body.emailData.email;
    // create reusable transporter object using the default SMTP transport
    console.log("process.env.SMTP_HOST", process.env.SMTP_HOST);
    console.log("process.env.SMTP_PORT", process.env.SMTP_PORT);
    console.log("rocess.env.SMTP_EMAIL", process.env.SMTP_EMAIL);
    console.log("process.env.SMTP_PASS", process.env.SMTP_PASS);
    let transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: false,
        auth: {
            user: process.env.SMTP_EMAIL,
            pass: process.env.SMTP_PASS,
        },
    });

    let message = {
        from: process.env.SMTP_EMAIL, // sender address
        to: customerEmail, // list of receivers
        subject: "Hello from Freightly", // Subject line
        text: "Freightly Payment.", // plain text body
        html: "<b>Payment was successfull.</b>", // html body
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
