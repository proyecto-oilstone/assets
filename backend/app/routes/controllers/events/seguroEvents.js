const seguroService = require("../services/event_services/seguroEvent");
const postFile = require("../services/files_services/postFile");

module.exports = {
  postSeguroEvent: async (req, res) => {
    const { mimetype, originalname, buffer } = req.file;
    const { carId, expirationDate, kilometres } = req.body;

    const fileUploaded = await postFile(mimetype, originalname, buffer, carId, expirationDate === "" ? null : expirationDate);
    const params = {
      seguroFileId: fileUploaded.id,
      carId,
      kilometres,
      expirationDate: expirationDate === "" ? null : expirationDate,
    };

    const event = await seguroService.postSeguroEvent(params);
    
    if (event) {
      res.status(201).json(event);
    } else {
      res.sendStatus(403);
    }
  },

  /**
   * Renove one vtv
   * @param {String} type
   * @param {String} name
   * @param {Blob} data
   * @param {String} expirationDate
   * @param {Number} id
   * @return 200 ok and message if was renoved
   */
  renove: async (req, res) => {
    const { mimetype, originalname, buffer } = req.file;
    const { expirationDate } = req.body;
    const { id } = req.params;

    await seguroService.renove({ id, type: mimetype, name: originalname, data: buffer, expirationDate: expirationDate === "" ? null : expirationDate });
    
    res.status(200).json({message: "file renoved"});
    
  },
}