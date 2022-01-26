const express = require("express");
const router = express.Router();
const upload = require("../../config/multer.config");
const downloadFiles = require("./services/files_services/downloadFile");
const getFiles = require("./services/files_services/getFiles");
const postFile = require("./services/files_services/postFile");


router.post('/files', upload.single("file"), postFile );
router.get('/files', getFiles );
router.get('/files/:id', downloadFiles)
module.exports = router
