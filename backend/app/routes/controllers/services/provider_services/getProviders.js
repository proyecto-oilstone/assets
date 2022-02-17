const { Provider } = require("../../../../db/index");
const { typeProviderToString } = require("../../../../utils/functions");

/**
 * Finds all the providers
 * @returns {provider} all the providers
 */

const getProvider = async (req, res) => {
  let query = {
    where: {},
    attributes: ["id", "nombreLargo", "nombreCorto", "observaciones", "type"],
    order: [["nombreLargo", "ASC"]],
  };

  let providers = await Provider.findAll(query);

  providers = providers.map((provider) => {
    provider = {
      ...provider.dataValues,
    };
    provider.type = typeProviderToString(provider.type);
    const { ...rest } = provider;
    return rest;
  });
  providers = { ...providers };
  res.status(200).json(providers);
};

module.exports = getProvider;
