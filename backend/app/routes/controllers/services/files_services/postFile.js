

const { Files } = require("../../../../db/index");

const postFile = async (req, res) => {
    const {mimetype, originalname, buffer} = req.files;
    const{document, CarId} = req.body;
    
    //console.log(req.files);
    console.log(req.FileList)

    try {
        
        console.log(req.file)
        console.log(req.body.files)
        console.log(req.body.file)
        console.log(req.files)

        const filesasd = req.files.map(file => {
            Files.create({
                name: file.originalname,
                type: file.mimetype,
                data: file.buffer,
                document,
                CarId

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
