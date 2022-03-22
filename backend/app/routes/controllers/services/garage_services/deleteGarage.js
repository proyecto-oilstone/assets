const { Garage, Cars } = require("../../../../db/index");

const deleteGarage = async (req, res) => {
    const { id } = req.params;

    try {
    let garage = await Garage.findOne({ where: { id } });

    let car = await Cars.findOne({ where: { GarageId: id } });

    if (!car) {
        await Garage.destroy({ where: { id } });
        return res.status(200).json({ message: "Garage deleted" });
    }
    
    if (!garage) {
        return res.status(404).send("The garage not found");
    }
    
    
    return res.status(404).send("The garage has cars");
    } catch (err) {
        return res.status(500).send(err.message);
    }

}

module.exports = deleteGarage;