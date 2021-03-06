const { Provider } = require("../../../../db/index");
const { typeProviderToString } = require("../../../../utils/functions");

/**
 * Creates a new provider
 * @param {Object} req.body 
 * @returns {provider} response with the provider created
 */

const postProvider = async (req, res) => {
  const { nombreLargo, nombreCorto, observaciones, type } = req.body;
  try {
    const provider = await Provider.create({
      nombreLargo,
      nombreCorto,
      observaciones,
      type,
    });
    provider.type = typeProviderToString(provider.type);
    res.status(200).json({
      message: "Provider created",
      provider,
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = postProvider;
