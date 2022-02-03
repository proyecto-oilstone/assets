const getCarDetail = require("../services/cars_services/getCarDetail");

module.exports = {
    getCarById: async (req, res) => {
        const car = await getCarDetail(req.params.id);
        if (car) {
            res.status(200).json(car);
        } else {
            res.sendStatus(404);
        }
    },
}