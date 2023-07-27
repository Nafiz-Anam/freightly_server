require("dotenv").config();
const AdminModel = require("../model/adminModel");
const accessToken = require("../utilities/tokenmanager/token");
const enc_dec = require("../utilities/decryptor/decryptor");
const helpers = require("../utilities/helper/general_helper");
const { createMollieClient } = require("@mollie/api-client");

const stripe = require("stripe")(process.env.STRIPE_SECRET);

const calculateOrderAmount = (total_price) => {
    let payAmount = total_price * 100;
    return payAmount;
};

var PaymentController = {
    createPayment: async (req, res) => {
        try {
            const { total_price } = req.body.orderData;
            // Create a PaymentIntent with the order amount and currency
            const paymentIntent = await stripe.paymentIntents.create({
                amount: calculateOrderAmount(total_price),
                currency: "eur",
                automatic_payment_methods: {
                    enabled: true,
                },
            });
            res.send({
                clientSecret: paymentIntent.client_secret,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                status: false,
                message: "Internal server error!",
            });
        }
    },

    webhook: async (req, res) => {
        try {
            const paymentId = req.body.id;
            console.log(paymentId);
            console.log(req.query);
            console.log(req.params);
            console.log(req.params.id);
            console.log(req.headers);
            res.status(200).json({
                status: true,
                message: "Got the response",
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                status: false,
                message: "Internal server error!",
            });
        }
    },
};

module.exports = PaymentController;
