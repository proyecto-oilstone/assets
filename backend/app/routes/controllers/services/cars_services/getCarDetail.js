const { Cars, Provider, CarType, Files, Sector } = require("../../../../db/index");

const getCarDetail = async (req, res) => {
  const { id } = req.params;

  let query = {
    where: { id },
    attributes: ["id", "patente", "activo", "año"],
    include: [
      {
        model: Provider,
        attributes: ["nombreLargo"],
        where: {},
        required: true,
      },
      {
        model: CarType,
        attributes: ["nombreLargo", "nombreCorto",],
        where: {},
        required: true,
      },
      {
        model: Files,
        attributes: ["id", "name", "type", "document"],
        where: {},
        required: false,
      },
      {
        model: Sector,
        attributes: ["id", "nombreLargo", "nombreCorto", "observaciones"],
        where: {},
        required: false,
      }
    ],
  };

  let car = await Cars.findOne(query);

  if (!car) {
    return res.status(404).send("Car not found");
  }
  

  car = {
    id: car.id,
    patente: car.patente,
    activo: car.activo,
    año: car.año,
    proveedor: car.dataValues.Provider.nombreLargo,
    modelo: car.dataValues.CarType.nombreLargo,
    marca: car.dataValues.CarType.nombreCorto,
    documento: car.dataValues.Files?.map(file => {
      return {
        id:file.dataValues.id,
        name:file.dataValues.name,
        type:file.dataValues.type,
        document:file.dataValues.document
        }}),
    Sector: car.dataValues.Sector?.nombreLargo

    
    
    
  };
  res.status(200).json(car);
};

module.exports = getCarDetail;
