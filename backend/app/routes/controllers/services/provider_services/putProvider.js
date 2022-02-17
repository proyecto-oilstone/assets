const { Provider } = require("../../../../db/index");
const { typeProviderToString } = require("../../../../utils/functions");


/**
 * Finds a provider by id, and updates it
 * 
 * @param {Number} req.params.id 
 * @param {Object} res.body
 * @returns {provider} with the updated information
 */

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
