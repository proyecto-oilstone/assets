const { Files } = require("../../../../db/index");
const checkCarFiles = require("./checkCarFiles");

/**
 * Creates a new file, and adds it to the car
 * @param {Object} req.body 
 * @param {Object} req.files 
 * @returns response of the operation
 */

const postFiles = async (req, res) => {
    const {mimetype, originalname, buffer} = req.files;
    const{document, CarId, expirationDate} = req.body;
    try {
        await Promise.all(req.files.map((file, index) => {
            const expiration = typeof expirationDate === "string" ? expirationDate : expirationDate[index];
            return Files.create({
                name: file.originalname,
                type: file.mimetype,
                data: file.buffer,
                document: "permanent",
                CarId,
                expirationDate: expiration !== "" ? expiration : null,

            });
        }));
        checkCarFiles(CarId);
        res.status(200).json({
            message: 'Files uploaded successfully!'
        });
    }  catch (err) {
        res.status(500).send(err.message);
    }
};

module.exports = postFiles;
