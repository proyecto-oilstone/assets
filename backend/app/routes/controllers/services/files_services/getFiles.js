const { Files, Cars } = require("../../../../db/index");

const getFiles = async (req, res) => {

    try {
        let query = {
            attributes: ['id', 'name','expirationDate','document'],
            include: {
                model: Cars,
                attributes: ["id", "patente"],
                where: {},
                required: true,
            }
        };
        let files = await Files.findAll(query);
        if (!files) {
            return [];
        }

        files = files.map(file => {
            const { Car, ...rest } = file.dataValues;
            file = rest;
            
            // file.carId = Car?.dataValues?.id;
            file.car = Car.dataValues;
            return file;
        });
        return files;
    } catch (err) {
        res.status(500).send(err.message);
    }
};

module.exports = getFiles;