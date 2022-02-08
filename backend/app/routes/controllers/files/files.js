const getFiles = require("../services/files_services/getFiles");

module.exports = {
    getFiles: async (req, res) => {
        const files = await getFiles();
        res.status(200).json(files);
    },
}