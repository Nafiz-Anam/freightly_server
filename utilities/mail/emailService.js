const nodemailer = require("nodemailer");

/** send mail from testing account */
const signup = async (req, res) => {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.hostinger.com", // Replace with your Hostinger SMTP host
        port: 465, // Replace with your Hostinger SMTP port
        secure: true, // true for 465, false for other ports
        auth: {
            user: "yourtransport@freightly.nl", // Replace with your Hostinger email address
            pass: "FreightlyNL2458$$$", // Replace with your Hostinger email password
        },
    });

    let message = {
        from: "yourtransport@freightly.nl", // sender address
        to: "nafiz.anam008@gmail.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Successfully Register with us.", // plain text body
        html: "<b>Successfully Register with us.</b>", // html body
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
