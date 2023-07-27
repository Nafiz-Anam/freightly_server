const router = require("express").Router();
const authController = require("../../controller/authController");
const authValidator = require("../../utilities/validations/authValidation");
const checkUserToken = require("../../utilities/tokenmanager/checkUserToken");
const applyUploader = require("../../uploads/applyUploder");
const UserController = require("../../controller/userController");
const checkAdminToken = require("../../utilities/tokenmanager/checkAdminToken");
const PaymentController = require("../../controller/paymentController");

router.post("/create", PaymentController.createPayment);
router.post("/webhook", PaymentController.webhook);


module.exports = router;
