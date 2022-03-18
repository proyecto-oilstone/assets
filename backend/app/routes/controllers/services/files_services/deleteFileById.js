const { Files, Event } = require("../../../../db/index");
const checkCarFiles = require("./checkCarFiles");
const vtvService = require("../event_services/vtvEvent");
const seguroService = require("../event_services/seguroEvent");
const { getCarById } = require("../../cars/cars");
const deleteCarSeguroById = require("../carType_services/deleteCarSeguro");
const deleteCarVtvById = require("../carType_services/deleteCarVTV");

/**
 * finds a file by id, and deletes it, also checks if the car has mandatory documentation,
 * if it doesn't have documentation then it sets the car as out of service.
 * One file can be vtv, seguro or image
 * 
 * @param {Number} req.params.carId 
 * @param {Number} req.params.fileId 
 * @returns message with the result of the operation
 */

const deleteFileById = async (req, res) => {
  const { fileId, carId } = req.params;
  let event = null;
  let typeEvent = "VTV";
  try {
    event = await vtvService.getVtvEventByFileId(fileId);
    if (!event) {
      event = await seguroService.getSeguroEventByFileId(fileId);
      typeEvent = "SEGURO";
    }
    if (event) {
      const carId = event.Event.carId;
      //removeEvent(event); remove event too
      if (typeEvent === "VTV") {
        deleteCarVtvById(carId);
      }
      if (typeEvent === "SEGURO") {
        deleteCarSeguroById(carId);
      }
    }
    
    await Files.destroy({ where: { id: fileId } });
    checkCarFiles(carId);
    res.status(200).json({message: "file deleted"});
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const removeEvent = async (event) => {
  const eventId = event.id; 
  await event.destroy();
  await Event.destroy({ where: { id: eventId } });
}

module.exports = deleteFileById
