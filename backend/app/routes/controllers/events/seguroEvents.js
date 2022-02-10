const seguroService = require("../services/event_services/seguroEvent");

module.exports = {
  postSeguroEvent: async (req, res) => {
    const { mimetype, originalname, buffer } = req.file;
    const { carId, createdAt, expirationDate } = req.body;
    const params = {
      type: mimetype,
      name: originalname,
      data: buffer,
      carId,
      createdAt,
      expirationDate: expirationDate === "" ? null : expirationDate,
    };

    const event = await seguroService.postSeguroEvent(params);
    
    if (event) {
      res.status(201).json(event);
    } else {
      res.sendStatus(403);
    }
  },
}