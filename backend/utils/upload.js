const multer = require('multer');
const path = require('path');

// Set up the Multer storage engine to store files locally
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Specify the folder to store files in
  },
  filename: (req, file, cb) => {
    // Use a unique filename based on the current timestamp
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
});

// Multer configuration
const upload = multer({ storage: storage });

module.exports = upload;
