const router = require("express").Router();
const OrderController = require("../../controller/orderController");
const { imageUploadMiddleware } = require("../../uploads/itemImageUploader");
const productUploader = require("../../uploads/productUploader");
const checkAdminToken = require("../../utilities/tokenmanager/checkAdminToken");
const checkPermission = require("../../utilities/tokenmanager/checkpermission");

router.post("/create", imageUploadMiddleware, OrderController.create);
router.post("/request", imageUploadMiddleware, OrderController.request);

module.exports = router;
