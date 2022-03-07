const { Cars, Provider, CarType, Files, Sector, VTVEvent, SeguroEvent } = require("../../../../db/index");
const { statusCarToString } = require("../../../../utils/functions");

/**
 * Finds a car by id
 * 
 * @param {Number} id 
 * @returns {car} with all the information
 */

const getCarDetail = async (id) => {
  let query = {
    where: { id },
    attributes: ["id", "patente", "año", "status", "VTV", "seguro"],
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

  let VTVQuery = {
    where: { id: car.VTV },
    attributes: ["id", "name", "type", "VTV"],
  };
  let SeguroQuery = {
    where: { id: car.seguro },
    attributes: ["id", "name", "type", "Seguro"],
  }
  const VTV = await VTVEvent.findOne(VTVQuery);
  const Seguro = await SeguroEvent.findOne(SeguroQuery)

  if (!car) {
    return null;
  }
  const allFiles = []
  if(car.dataValues.Files){
    allFiles.push(car.dataValues.Files)
    if(VTV?.dataValues !== undefined && Seguro?.dataValues !== undefined){
      allFiles[0].push(VTV.dataValues)
      allFiles[0].push(Seguro.dataValues)
    }
  }
  
  car = {
    id: car.id,
    patente: car.patente,
    año: car.año,
    VTV: car.VTV,
    seguro: car.seguro,
    proveedor: car.dataValues.Provider.nombreLargo,
    modelo: car.dataValues.CarType.nombreLargo,
    marca: car.dataValues.CarType.nombreCorto,
    status: statusCarToString(car.status),
    documento:{
      files : car.dataValues.Files?.map(file => {
        return {
          id:file.dataValues?.id,
          name:file.dataValues?.name,
          type:file.dataValues?.type,
          document:file.dataValues?.document
          }})
    },
    allFiles: allFiles,
      
    Sector: car.dataValues.Sector?.nombreLargo,
    image: car.dataValues.Files?.find(file => file.document === "Image"),

    
    
    
  };
  return car;
};

module.exports = getCarDetail;
