const { Provider } = require("../../../../db/index");
const { typeProviderToString } = require("../../../../utils/functions");

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
