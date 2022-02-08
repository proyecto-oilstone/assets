

const { Files } = require("../../../../db/index");

const postFile = async (req, res) => {
    const {mimetype, originalname, buffer} = req.files;
    const{document, CarId, expirationDate} = req.body;
    
    try {
        const filesasd = req.files.map((file, index) => {
            const expiration = typeof expirationDate === "string" ? expirationDate : expirationDate[index];
            Files.create({
                name: file.originalname,
                type: file.mimetype,
                data: file.buffer,
                document,
                CarId,
                expirationDate: expiration,

                })
        })
        
        res.status(200).json({
            message: 'Files uploaded successfully!' 
        });
    }  catch (err) {
        res.status(500).send(err.message);
    }
};

module.exports = postFile
