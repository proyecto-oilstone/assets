

const { Files } = require("../../../../db/index");

const postFile = async (req, res) => {
    const {mimetype, originalname, buffer} = req.file;
    const{document, CarId} = req.body;
    console.log(mimetype, originalname, buffer);

    try {
        const file = await Files.create({
            type: mimetype,
            name: originalname,
            data: buffer,
            document,
        });
        await file.setCar(CarId);

        res.status(200).json({
            message: 'File uploaded successfully! -> filename = ' + originalname
        });
    }  catch (err) {
        res.status(500).send(err.message);
    }
};

module.exports = postFile
