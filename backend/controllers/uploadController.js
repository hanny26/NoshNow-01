const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images');
    },
    filename: (req, file, cb) => {
        // You might want to generate a unique filename here
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

// POST /upload
// Middleware: verifyToken
// Uploads multiple image files
const uploadImages = (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: 'Please upload at least one file' });
        }

        // Process each file if needed
        let fileNames = req.files.map(file => file.filename);

        // Files uploaded successfully
        return res.status(200).json({ message: 'Files uploaded successfully', fileNames: fileNames });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    upload,
    uploadImages
};
