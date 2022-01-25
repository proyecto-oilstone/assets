const { Provider } = require("../../../../db/index");

const getProviderDetail = async (req, res) => {
  const { id } = req.params;

  let query = {
    where: { id },
    attributes: ["id", "nombreLargo", "nombreCorto", "observaciones"],
  };
   let provider = await Provider.findOne(query);

  if (!provider) {
    return res.status(404).send("Provider not found");
  }
  provider = {
    id: provider.id,
    nombreLargo: provider.nombreLargo,
    nombreCorto: provider.nombreCorto,
    observaciones: provider.observaciones,
  };
  res.status(200).json(provider);
};

module.exports = getProviderDetail;
