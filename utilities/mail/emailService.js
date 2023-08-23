const nodemailer = require("nodemailer");
const invoiceTemplate = require("../mailTemplate/invoiceTemplate");
const helpers = require("../helper/general_helper");

/** send mail from testing account */
const sentInvoice = async (req, res) => {
    let order_id = req.body.order_id;

    let orderData = await helpers.get_data_list("*", "orders", {
        id: order_id,
    });
    console.log("orderData =>", orderData);

    let orderItems = await helpers.get_data_list("*", "order_items", {
        order_id: order_id,
    });
    console.log("orderItems =>", orderItems);

    let emailData = {
        contactDetails: {
            customerName: `${orderData[0]?.customer_firstName} ${orderData[0]?.customer_lastName}`,
            customer_email: orderData[0]?.customer_email,
            customer_phone: orderData[0]?.customer_phone,
            customer_address: orderData[0]?.customer_address,

            customer_companyName: orderData[0]?.customer_companyName,
            customer_chamberOfCommerce:
                orderData[0]?.customer_chamberOfCommerce,
            customer_vatNumber: orderData[0]?.customer_vatNumber,
            customer_postalCode: orderData[0]?.customer_postalCode,
            customer_areaCode: orderData[0]?.customer_areaCode,
        },
        pickupContact: {
            pickup_contact_name: orderData[0]?.pickup_contact_name,
            pickup_contact_email: orderData[0]?.pickup_contact_email,
            pickup_contact_phone: orderData[0]?.pickup_contact_phone,
            pickup_contact_address: orderData[0]?.pickup_contact_address,
        },
        deliveryContact: {
            delivery_contact_name: orderData[0]?.delivery_contact_name,
            delivery_contact_email: orderData[0]?.delivery_contact_email,
            delivery_contact_phone: orderData[0]?.delivery_contact_phone,
            delivery_contact_address: orderData[0]?.delivery_contact_address,
        },
        invoice_details: [
            {
                description: `Transportation`,
                price: `${orderData[0]?.transportPrice}`,
            },
            {
                description: `${orderData[0]?.request_assistance_title}`,
                price: `${orderData[0]?.request_assistance_price}`,
            },
            {
                description: `${orderData[0]?.pickup_floor_title}`,
                price: `${orderData[0]?.pickup_floor_price}`,
            },
            {
                description: `${orderData[0]?.pickup_date}, ${orderData[0]?.pickup_day}, ${orderData[0]?.pickup_time}`,
                price: `${
                    orderData[0]?.pickup_date_price +
                    orderData[0]?.pickup_time_price
                }`,
            },
            {
                description: `${orderData[0]?.delivery_floor_title}`,
                price: `${orderData[0]?.delivery_floor_price}`,
            },
            {
                description: `${orderData[0]?.pickup_date}, ${orderData[0]?.pickup_day}, ${orderData[0]?.delivery_time}`,
                price: `${orderData[0]?.delivery_time_price}`,
            },
        ],
        total_order_price: orderData[0]?.total_order_price,
    };

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
        to: `${orderData[0]?.customer_email},orders@freightly.nl`, // list of receivers
        subject: "Freightly Invoice", // Subject line
        // text: "Freightly Payment.", // plain text body
        html: invoiceTemplate(emailData), // html body
    };

    transporter
        .sendMail(message)
        .then((info) => {
            return res.status(201).json({
                msg: "Invoice sent successfully.",
            });
        })
        .catch((error) => {
            console.log(error);
            return res.status(500).json({ error });
        });
};

module.exports = sentInvoice;
