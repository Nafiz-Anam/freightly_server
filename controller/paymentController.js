require("dotenv").config();
const AdminModel = require("../model/adminModel");
const accessToken = require("../utilities/tokenmanager/token");
const enc_dec = require("../utilities/decryptor/decryptor");
const helpers = require("../utilities/helper/general_helper");
const { createMollieClient } = require("@mollie/api-client");

var PaymentController = {
    make_payment: async (req, res) => {
        try {
            const mollieClient = createMollieClient({
                apiKey: "test_MpvUS5JMsWDnCpuE36K6NqGcPEhxC3",
            });

            (async () => {
                try {
                    const payment = await mollieClient.payments.create({
                        amount: {
                            currency: "EUR",
                            value: "199.00", // You must send the correct number of decimals, thus we enforce the use of strings
                        },
                        description: "My first payment",
                        redirectUrl: "https://app.freightly.nl/",
                        webhookUrl:
                            "https://freightly-server.onrender.com/api/v1/payment/response",
                        metadata: {
                            order_id: "TEST1003",
                        },
                    });

                    console.log(payment);
                    res.status(200).json({
                        status: true,
                        message: "Payment Done!!!",
                    });
                } catch (error) {
                    console.warn("error", error);
                    res.status(500).json({
                        status: false,
                        message: error.title,
                    });
                }
            })();
        } catch (error) {
            console.log(error);
            res.status(500).json({
                status: false,
                message: "Internal server error!",
            });
        }
    },
    response: async (req, res) => {
        try {
            console.log(req.body);
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
