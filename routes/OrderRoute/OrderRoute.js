const router = require("express").Router();
const OrderController = require("../../controller/orderController");
const { auctionImgUploader } = require("../../uploads/auctionImgUploader");
const { imageUploadMiddleware } = require("../../uploads/itemImageUploader");
const productUploader = require("../../uploads/productUploader");
const checkAdminToken = require("../../utilities/tokenmanager/checkAdminToken");
const checkPermission = require("../../utilities/tokenmanager/checkpermission");


router.post("/request", imageUploadMiddleware, OrderController.request);
router.post(
    "/create",
    auctionImgUploader,
    imageUploadMiddleware,
    OrderController.create
);

module.exports = router;
