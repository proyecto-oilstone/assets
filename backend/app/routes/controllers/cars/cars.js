const downloadVTVByCarId = require("../services/cars_services/downloadVTVByCarId");
const downloadSeguroByCarId = require("../services/cars_services/downloadSeguroByCarId");
const getCarDetail = require("../services/cars_services/getCarDetail");
const putCar = require("../services/cars_services/putCar");
const stream = require("stream");
const dashboardInfo = require("../services/cars_services/dashboardInfo");
const { finishCarRepair } = require("../services/event_services/repairRequestEvent");

module.exports = {
  getCarById: async (req, res) => {
    const car = await getCarDetail(req.params.id);
    if (car) {
        res.status(200).json(car);
    } else {
        res.sendStatus(404);
    }
  },

  editCarById: async (req, res) => {
    const { id } = req.params;
    const { patente, ProviderId, CarTypeId, año, SectorId } = req.body;
    const allowedFields = { patente, ProviderId, CarTypeId, año, SectorId };
    const car = await putCar(id, allowedFields);
    res.status(200).json(car);
  },

  downloadVTVByCarId: async (req, res) => {
    try {
      const { id } = req.params;
      const vtv = await downloadVTVByCarId(id);
      const fileContents = Buffer.from(vtv.data, "base64");
      const readStream = new stream.PassThrough();
      readStream.end(fileContents);
      
      res.set('Content-disposition', 'attachment; filename=' + vtv.name);
      res.set('Content-Type', vtv.type);

      readStream.pipe(res);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  },

  downloadSeguroByCarId: async (req, res) => {
    try {
      const { id } = req.params;
      const seguro = await downloadSeguroByCarId(id);
      const fileContents = Buffer.from(seguro.data, "base64");
      const readStream = new stream.PassThrough();
      readStream.end(fileContents);
      
      res.set('Content-disposition', 'attachment; filename=' + seguro.name);
      res.set('Content-Type', seguro.type);

      readStream.pipe(res);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  },
  
  dashboardInfo: async (req, res) => {
    res.status(200).send(await dashboardInfo(req.query.endDate));
  },

  finishRepair: async (req, res) => {
    try {
      const reportProblems = req.body.reportProblems;
      const carId = req.params.id;
      await finishCarRepair(carId, reportProblems);
      res.status(200).send({ message: "repair successful" });
    } catch (err) {
      res.status(200).send({ message: err.message });
    }
  },
}