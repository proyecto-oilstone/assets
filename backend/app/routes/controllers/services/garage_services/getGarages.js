const { Garage } = require("../../../../db/index");

const getGarages = async (req, res) => {

    let query = {
        where: {},
        attributes: ["id", "nombreLargo", "nombreCorto", "observaciones"],
        order: [["id", "ASC"]],
    }

    let garages = await Garage.findAll(query);

    garages = garages.map((garage) => {
        garage = {
            ...garage.dataValues,
        };
        const { ...rest } = garage;
        return rest;
    }
    );
    garages = { ...garages };
    res.status(200).json(garages);

}

module.exports = getGarages