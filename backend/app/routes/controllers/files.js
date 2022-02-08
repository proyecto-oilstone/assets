const express = require("express");
const router = express.Router();
const upload = require("../../config/multer.config");
const deleteFileById = require("./services/files_services/deleteFileById");
const downloadFiles = require("./services/files_services/downloadFile");
const controller = require("./files/files")
const getFiles = require("./services/files_services/getFiles");
const postFile = require("./services/files_services/postFile");


router.post('/files', upload.array("file", 10), postFile );
router.get('/files', controller.getFiles );
router.get('/files/:id', downloadFiles)
router.delete('/files/:id', deleteFileById);
module.exports = router
