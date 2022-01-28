const { Files } = require("../../../../db/index");

const getFiles = async (req, res) => {

    try {
        const files = await Files.findAll({attributes: ['id', 'name',]});
        if (!files) {
        return res.status(500).send("No hay archivos");
        }
        res.status(200).json({ files });
    } catch (err) {
        res.status(500).send(err.message);
    }
};

module.exports = getFiles;