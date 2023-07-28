const multer = require("multer");
const fs = require("fs");
const path = require("path");

const uploadDirectory = path.join(__dirname, "../public/items");
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

const imageUploadMiddleware = (req, res, next) => {
    const selectedItems = req.body.storage.selected_items;

    if (
        !selectedItems ||
        !Array.isArray(selectedItems) ||
        selectedItems.length === 0
    ) {
        return res
            .status(400)
            .json({
                error: "Invalid or empty selected_items array in the request body",
            });
    }

    // Process each item in the selected_items array
    const imageFileNames = [];
    const imageUploadPromises = selectedItems.map((item) => {
        return new Promise((resolve, reject) => {
            if (!item.image || typeof item.image !== "string") {
                reject(
                    new Error(
                        "Invalid or missing image data in the item object"
                    )
                );
            }

            // Decode the base64 data into a buffer
            const base64Data = item.image.replace(
                /^data:image\/jpeg;base64,/,
                ""
            ); // Remove data:image/jpeg;base64 part
            const imageBuffer = Buffer.from(base64Data, "base64");

            // Generate a unique filename for the uploaded file
            const uniqueFilename = Date.now() + ".jpg"; // You can change the extension based on the image type
            imageFileNames.push(uniqueFilename);

            // Save the image to the server
            fs.writeFile(
                path.join(uploadDirectory, uniqueFilename),
                imageBuffer,
                (err) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                }
            );
        });
    });

    // Wait for all image upload promises to resolve
    Promise.allSettled(imageUploadPromises)
        .then(() => {
            req.imageFileNames = imageFileNames; // Attach the image filenames to the request object
            next();
        })
        .catch((err) => {
            return res
                .status(500)
                .json({
                    error: "Failed to upload images",
                    details: err.message,
                });
        });
};

module.exports = { upload, imageUploadMiddleware };
