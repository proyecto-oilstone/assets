const { Garage, Cars } = require("../../../../db/index");
const { statusCarToString } = require("../../../../utils/functions");

const getGarageDetail = async (req, res) => {
    const { id } = req.params;

    let query = {
        where: { id },
        attributes: ["id", "nombreLargo", "nombreCorto", "observaciones"],
        include: [
            {
                model: Cars,
                attributes: ["id", "patente", "año", "status"],
                where: {},
                required: false,
            },
        ]
    }

    let garage = await Garage.findOne(query);

    if (!garage) {
        return res.status(404).send("Garage not found");
    }

    garage = {
        id: garage.id,
        nombreLargo: garage.nombreLargo,
        nombreCorto: garage.nombreCorto,
        observaciones: garage.observaciones,
        vehiculos: garage.dataValues.Cars?.map(car => {
            car = {
                id: car.id,
                patente: car.patente,
                año: car.año,
                status: statusCarToString(car.status),
            }
            return car;
        }
        )
    }

    res.status(200).json(garage);

}

module.exports = getGarageDetail;