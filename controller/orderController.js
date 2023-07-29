require("dotenv").config();
const OrderModel = require("../model/orderModel");
const enc_dec = require("../utilities/decryptor/decryptor");
const helpers = require("../utilities/helper/general_helper");
const moment = require("moment");
let static_url = process.env.STATIC_FILE_URL;

var ProductController = {
    create: async (req, res) => {
        const currentDateTime = moment().format("YYYY-MM-DD HH:mm");
        // console.log(req.body.storage);
        // console.log(req.body.storage.selected_items);
        let val = req.body.storage;
        let itemData = req.body.storage.selected_items;
        let itemImages = req.imageFileNames;
        console.log("Image filenames:", req.imageFileNames);
        try {
            let orderData = {
                fromAddress: val?.fromAddress ? val?.fromAddress : "",
                toAddress: val?.toAddress ? val?.toAddress : "",
                distance: val?.distance ? val?.distance : 0,

                starting_point_title: val?.starting_point.title
                    ? val?.starting_point.title
                    : "",

                pickup_date: val?.pickup_date?.date
                    ? val?.pickup_date?.date
                    : "",
                pickup_day: val?.pickup_date?.day ? val?.pickup_date?.day : "",
                pickup_date_price: val?.pickup_date?.cost
                    ? parseFloat((val?.pickup_date?.cost).slice(1))
                    : 0,

                pickup_time: val?.pickup_time?.time
                    ? val?.pickup_time?.time
                    : "",
                pickup_time_price: val?.pickup_time?.cost
                    ? parseFloat((val?.pickup_time?.cost).slice(1))
                    : 0,

                pickup_floor_title: val?.pickup_floor?.title
                    ? val?.pickup_floor?.title
                    : "",
                pickup_floor_price: val?.pickup_floor?.cost
                    ? parseFloat((val?.pickup_floor?.cost).slice(1))
                    : 0,

                request_assistance_title: val?.request_assistance?.title
                    ? val?.request_assistance?.title
                    : "",
                request_assistance_price: val?.request_assistance?.cost
                    ? parseFloat((val?.request_assistance?.cost).slice(1))
                    : 0,

                delivery_time: val?.delivery_time?.time
                    ? val?.delivery_time?.time
                    : "",
                delivery_time_price: val?.delivery_time?.cost
                    ? parseFloat((val?.delivery_time?.cost).slice(1))
                    : 0,

                delivery_floor_title: val?.delivery_floor?.title
                    ? val?.delivery_floor?.title
                    : "",
                delivery_floor_price: val?.delivery_floor?.cost
                    ? parseFloat((val?.delivery_floor?.cost).slice(1))
                    : 0,

                pickup_contact_name: val?.pickup_contact?.name
                    ? val?.pickup_contact?.name
                    : "",
                pickup_contact_email: val?.pickup_contact?.email
                    ? val?.pickup_contact?.email
                    : "",
                pickup_contact_phone: val?.pickup_contact?.phone
                    ? val?.pickup_contact?.phone
                    : "",
                pickup_contact_address: val?.pickup_contact?.address
                    ? val?.pickup_contact?.address
                    : "",

                delivery_contact_name: val?.delivery_contact?.name
                    ? val?.delivery_contact?.name
                    : "",
                delivery_contact_email: val?.delivery_contact?.email
                    ? val?.delivery_contact?.email
                    : "",
                delivery_contact_phone: val?.delivery_contact?.phone
                    ? val?.delivery_contact?.phone
                    : "",
                delivery_contact_address: val?.delivery_contact?.address
                    ? val?.delivery_contact?.address
                    : "",

                customer_firstName: val?.personal_details?.firstName
                    ? val?.personal_details?.firstName
                    : "",
                customer_lastName: val?.personal_details?.lastName
                    ? val?.personal_details?.lastName
                    : "",
                customer_email: val?.personal_details?.email
                    ? val?.personal_details?.email
                    : "",
                customer_phone: val?.personal_details?.phoneNumber
                    ? val?.personal_details?.phoneNumber
                    : "",
                customer_companyName: val?.personal_details?.companyName
                    ? val?.personal_details?.companyName
                    : "",
                customer_chamberOfCommerce: val?.personal_details
                    ?.chamberOfCommerce
                    ? val?.personal_details?.chamberOfCommerce
                    : "",
                customer_vatNumber: val?.personal_details?.vatNumber
                    ? val?.personal_details?.vatNumber
                    : "",
                customer_address: val?.personal_details?.streetAddress
                    ? val?.personal_details?.streetAddress
                    : "",
                customer_postalCode: val?.personal_details?.postalCode
                    ? val?.personal_details?.postalCode
                    : "",
                customer_areaCode: val?.personal_details?.areaCode
                    ? val?.personal_details?.areaCode
                    : "",

                newsletter: val?.personal_details?.newsletter
                    ? val?.personal_details?.newsletter
                    : "",
                agreeTerms: val?.personal_details?.agreeTerms
                    ? val?.personal_details?.agreeTerms
                    : "",
                agreePrivacy: val?.personal_details?.agreePrivacy
                    ? val?.personal_details?.agreePrivacy
                    : "",

                total_order_price: val?.total_price ? val?.total_price : 0,
                created_at: currentDateTime,
            };

            // console.log("orderData", orderData);

            await OrderModel.add(orderData)
                .then(async (result) => {
                    // console.log(result);
                    for (
                        let i = 0;
                        i < itemData.length && i < itemImages.length;
                        i++
                    ) {
                        itemData[i].image =
                            static_url + "items/" + itemImages[i];
                        itemData[i].order_id = result.insertId;
                        console.log(itemData[i]);
                        await OrderModel.addItems(itemData[i])
                            .then((result2) => {
                                console.log(result2);
                            })
                            .catch((error) => {
                                console.log(error);
                            });
                    }
                    res.status(200).json({
                        status: true,
                        message: "Order placed successfully!",
                        order_id: result.insertId,
                    });
                })
                .catch((error) => {
                    console.log(error);
                    res.status(500).json({
                        status: false,
                        message: "Internal server error!",
                    });
                });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                status: false,
                message: "Internal server error!",
            });
        }
    },

    update: async (req, res) => {
        try {
            let id = enc_dec.decrypt(req.bodyString("product_id"));
            let Product_data = {
                product_img: req.all_files?.product_img,
                name: req.bodyString("name"),
                start_date: req.bodyString("start_date"),
                end_date: req.bodyString("end_date"),
                loan_terms: req.bodyString("loan_terms"),
                loan_interest_rate: req.bodyString("loan_interest_rate"),
                loan_amount: req.bodyString("loan_amount"),
            };

            await ProductModel.updateDetails({ id: id }, Product_data)
                .then((result) => {
                    res.status(200).json({
                        status: true,
                        message: "Product updated successfully!",
                    });
                })
                .catch((error) => {
                    console.log(error);
                    res.status(500).json({
                        status: false,
                        message: "Internal server error!",
                    });
                });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                status: false,
                message: "Internal server error!",
            });
        }
    },

    list: async (req, res) => {
        try {
            let limit = {
                perpage: 10,
                start: 0,
            };
            if (req.bodyString("perpage") && req.bodyString("page")) {
                perpage = parseInt(req.bodyString("perpage"));
                start = parseInt(req.bodyString("page"));
                limit.perpage = perpage;
                limit.start = (start - 1) * perpage;
            }
            let condition = {
                status: 0,
            };

            const totalCount = await ProductModel.get_count(condition);
            console.log(totalCount);

            ProductModel.select_list(condition, limit)
                .then(async (result) => {
                    let response = [];
                    for (let val of result) {
                        let temp = {
                            id: val?.id ? enc_dec.encrypt(val?.id) : "",
                            product_img: val?.product_img
                                ? val?.product_img
                                : "",
                            name: val?.name ? val?.name : "",
                            start_date: val?.start_date ? val?.start_date : "",
                            end_date: val?.end_date ? val?.end_date : "",
                            loan_terms: val?.loan_terms ? val?.loan_terms : "",
                            loan_interest_rate: val?.loan_interest_rate
                                ? val?.loan_interest_rate
                                : "",
                            loan_amount: val?.loan_amount
                                ? val?.loan_amount
                                : "",
                            status: val?.status === 0 ? "active" : "inactive",
                            created_at: val?.created_at ? val?.created_at : "",
                            updated_at: val?.updated_at ? val?.updated_at : "",
                        };
                        response.push(temp);
                    }
                    res.status(200).json({
                        status: true,
                        data: response,
                        message: "Product fetched successfully!",
                        total: totalCount,
                    });
                })
                .catch((err) => {
                    console.log(err);
                    res.status(500).json({
                        status: false,
                        data: {},
                        error: "Server side error!",
                    });
                });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                status: false,
                data: {},
                error: "Server side error!",
            });
        }
    },

    details: async (req, res) => {
        try {
            let id = enc_dec.decrypt(req.bodyString("product_id"));
            ProductModel.select({ id: id })
                .then(async (result) => {
                    let response = [];
                    for (let val of result) {
                        let temp = {
                            id: val?.id ? enc_dec.encrypt(val?.id) : "",
                            product_img: val?.product_img
                                ? val?.product_img
                                : "",
                            name: val?.name ? val?.name : "",
                            start_date: val?.start_date ? val?.start_date : "",
                            end_date: val?.end_date ? val?.end_date : "",
                            loan_terms: val?.loan_terms ? val?.loan_terms : "",
                            loan_interest_rate: val?.loan_interest_rate
                                ? val?.loan_interest_rate
                                : "",
                            loan_amount: val?.loan_amount
                                ? val?.loan_amount
                                : "",
                            status: val?.status === 0 ? "active" : "inactive",
                            created_at: val?.created_at ? val?.created_at : "",
                            updated_at: val?.updated_at ? val?.updated_at : "",
                        };
                        response.push(temp);
                    }
                    res.status(200).json({
                        status: true,
                        data: response,
                        message: "Product details fetched successfully!",
                    });
                })
                .catch((err) => {
                    console.log(err);
                    res.status(500).json({
                        status: false,
                        data: {},
                        error: "Server side error!",
                    });
                });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                status: false,
                data: {},
                error: "Server side error!",
            });
        }
    },

    delete: async (req, res) => {
        try {
            let id = enc_dec.decrypt(req.bodyString("product_id"));
            ProductModel.delete({ id: id })
                .then(async (result) => {
                    res.status(200).json({
                        status: true,
                        message: "Product deleted successfully!",
                    });
                })
                .catch((err) => {
                    console.log(err);
                    res.status(500).json({
                        status: false,
                        data: {},
                        error: "Server side error!",
                    });
                });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                status: false,
                data: {},
                error: "Server side error!",
            });
        }
    },
};

module.exports = ProductController;
