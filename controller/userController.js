require("dotenv").config();
const UserModel = require("../model/userModel");
const LoanModel = require("../model/loanModel");
const enc_dec = require("../utilities/decryptor/decryptor");
const helpers = require("../utilities/helper/general_helper");
const moment = require("moment");
let static_url = process.env.STATIC_FILE_URL;

var UserController = {
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

            const totalCount = await UserModel.get_count();

            UserModel.select_list(limit)
                .then(async (result) => {
                    let response = [];
                    for (val of result) {
                        temp = {
                            id: val?.id ? enc_dec.encrypt(val?.id) : "",
                            mobile_code: val?.mobile_code
                                ? val?.mobile_code
                                : "",
                            mobile_no: val?.mobile_no ? val?.mobile_no : "",
                            status: val?.status === 0 ? "active" : "block",
                            created_at: val?.created_at ? val?.created_at : "",
                            updated_at: val?.updated_at ? val?.updated_at : "",
                        };
                        response.push(temp);
                    }
                    res.status(200).json({
                        status: true,
                        data: response,
                        message: "Users fetched successfully!",
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

    block: async (req, res) => {
        let user_id = enc_dec.decrypt(req.bodyString("user_id"));
        try {
            let user_data = {
                status: 1,
                updated_at: moment().format("YYYY-MM-DD HH:mm"),
            };
            await UserModel.updateDetails({ id: user_id }, user_data);
            res.status(200).json({
                status: true,
                message: "User blocked successfully!",
            });
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    },

    delete: async (req, res) => {
        let user_id = enc_dec.decrypt(req.bodyString("user_id"));
        try {
            await UserModel.delete({ id: user_id });
            res.status(200).json({
                status: true,
                message: "User deleted successfully!",
            });
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    },

    details_add: async (req, res) => {
        try {
            let applyInfo = {
                user_id: req.user.id,
                select_id_type: req.bodyString("select_id_type"),
                full_name: req.bodyString("full_name"),
                card_no: req.bodyString("card_no"),
                birth_date: req.bodyString("birth_date"),
                gender: req.bodyString("gender"),
                blood_group: req.bodyString("blood_group"),
                occupation: req.bodyString("occupation"),
                education: req.bodyString("education"),
                salary_range: req.bodyString("salary_range"),
                residence_type: req.bodyString("residence_type"),
                first_person_name: req.bodyString("first_person_name"),
                first_phone: req.bodyString("first_phone"),
                first_relation: req.bodyString("first_relation"),
                account_holder_name: req.bodyString("account_holder_name"),
                account_number: req.bodyString("account_number"),
                ifsp_code: req.bodyString("ifsp_code"),
                id_front_side:
                    static_url + "customer/" + req.all_files?.id_front_side,
                id_back_side:
                    static_url + "customer/" + req.all_files?.id_back_side,
                user_image:
                    static_url + "customer/" + req.all_files?.user_image,
            };
            if (req.bodyString("second_person_name")) {
                applyInfo.second_person_name =
                    req.bodyString("second_person_name");
                applyInfo.second_phone = req.bodyString("second_phone");
                applyInfo.second_relation = req.bodyString("second_relation");
            }
            if (req.bodyString("third_person_name")) {
                applyInfo.third_person_name =
                    req.bodyString("third_person_name");
                applyInfo.third_phone = req.bodyString("third_phone");
                applyInfo.third_relation = req.bodyString("third_relation");
            }

            await LoanModel.add(applyInfo)
                .then((result) => {
                    res.status(200).json({
                        status: true,
                        message: "Application submitted successfully!",
                    });
                })
                .catch((error) => {
                    console.log(error);
                    res.status(500).json({
                        status: false,
                        message: "Unable to submit application. Try again!",
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

    enc: async (req, res) => {
        try {
            let data = req.bodyString("data");
            let enc = enc_dec.encrypt(data);
            res.status(200).json({
                status: true,
                data: enc,
                error: "encrypted data",
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

module.exports = UserController;
