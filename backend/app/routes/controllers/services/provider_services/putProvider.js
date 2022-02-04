const { Provider } = require("../../../../db/index");
const { typeProviderToString } = require("../../../../utils/functions");

const putProvider = async (req, res) => {
  const { id } = req.params;
  const { nombreLargo, nombreCorto, observaciones, type } = req.body;
  try {
    await Provider.update({ nombreLargo, nombreCorto, observaciones, type }, { where: { id } });
    const provider = await Provider.findOne({ where: { id } });
    provider.type = typeProviderToString(provider.type);
    res.status(200).json(provider);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = putProvider;
