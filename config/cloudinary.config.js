const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    allowed_formats: ['jpg', 'png', 'webp', 'jpeg', 'ico'],
    folder: 'project-2'
  }
});

// Configuratión  of size limit (2MB)
const fileUploader = multer({
  storage,
  limits: {
    fileSize: 2 * 1024 * 1024 // Limit size to 2MB
  }
});

module.exports = fileUploader;
