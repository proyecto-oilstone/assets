const { Cars, Files } = require("../../../../db/index");

const getAllFilesByCarId = async (req, res) => {
  const { id } = req.params;

  let query = {
    where: { CarId: id },
    attributes: ["id", "name", "type", "document", "expirationDate"],
    
  };

  let files = await Files.findAll(query);
  if (!files) {
    return [];
}

  files = files.map(file => {
      file = {
            ...file.dataValues,
      }

      const {  ...rest } = file;
    return rest;
    });
    files = { ...files }
  /* car = {
    id: car.id,
    patente: car.patente,
    Files: car.dataValues.Files?.map((file) => {
      return {
        id: file.dataValues?.id,
        name: file.dataValues?.name,
        type: file.dataValues?.type,
        document: file.dataValues?.document,
        expirationDate: file.dataValues?.expirationDate,
      };
    }),
  }; */
  /* car = { ...car }; */
  res.status(200).json(files);
};

module.exports = getAllFilesByCarId;
