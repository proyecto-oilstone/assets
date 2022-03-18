const express = require("express");
const router = express.Router();
const upload = require("../../config/multer.config");
const deleteFileById = require("./services/files_services/deleteFileById");
const downloadFiles = require("./services/files_services/downloadFile");
const controller = require("./files/files")
const postFiles = require("./services/files_services/postFiles");
const postImage = require("./services/files_services/postImage");


router.post('/files', upload.array("file", 10), postFiles );
router.get('/files', controller.getFiles );
router.get('/files/:id', downloadFiles)
router.delete('/files/:fileId/car/:carId', deleteFileById);
router.post('/files/img', upload.single("file"), postImage);
module.exports = router
