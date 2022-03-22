const { Garage } = require("../../../../db/index");

const postGarage = async (req, res) => {
    const { nombreLargo, nombreCorto, observaciones } = req.body;
    const garage = await Garage.create({
        nombreLargo,
        nombreCorto,
        observaciones,
    });
    res.status(201).json(garage);

}

module.exports = postGarage;