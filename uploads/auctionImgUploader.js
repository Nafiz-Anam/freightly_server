const multer = require("multer");
const fs = require("fs");
const path = require("path");

const uploadDirectory = path.join(__dirname, "../public/auction");
console.log(uploadDirectory);

// Create the "uploaded_images" directory if it doesn't exist
if (!fs.existsSync(uploadDirectory)) {
    fs.mkdirSync(uploadDirectory);
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDirectory);
    },
    filename: function (req, file, cb) {
        // Generate a unique filename for the uploaded file
        const uniqueFilename = Date.now() + ".jpg"; // You can change the extension based on the image type
        cb(null, uniqueFilename);
    },
});

const upload = multer({ storage });

const auctionImgUploader = (req, res, next) => {
    if (
        !req.body.storage ||
        !req.body.storage.auction_details ||
        !req.body.storage.auction_details.image
    ) {
        // If the image is not available, simply skip the image uploading logic
        return next();
    }

    const selectedItem = req.body.storage.auction_details.image;

    if (!selectedItem || typeof selectedItem !== "string") {
        return res.status(400).json({
            error: "Invalid or missing image data in the request body",
        });
    }

    // Decode the base64 data into a buffer
    const base64Data = selectedItem.replace(/^data:image\/jpeg;base64,/, ""); // Remove data:image/jpeg;base64 part
    const imageBuffer = Buffer.from(base64Data, "base64");

    // Generate a unique filename for the uploaded file
    const uniqueFilename = Date.now() + ".jpg"; // You can change the extension based on the image type

    // Save the image to the server
    fs.writeFile(
        path.join(uploadDirectory, uniqueFilename),
        imageBuffer,
        (err) => {
            if (err) {
                return res.status(500).json({
                    error: "Failed to upload image",
                    details: err.message,
                });
            } else {
                req.auctionImage = uniqueFilename; // Attach the image filename to the request object
                next();
            }
        }
    );
};

module.exports = { upload, auctionImgUploader };
