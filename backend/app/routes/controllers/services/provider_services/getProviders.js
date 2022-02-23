const { Provider } = require("../../../../db/index");

const getProvider = async (req, res) => {
  let query = {
    where: {},
    attributes: ["id", "nombreLargo", "nombreCorto", "observaciones"],
    order: [["id", "ASC"]],
  };

  let providers = await Provider.findAll(query);

  providers = providers.map((provider) => {
    provider = {
      ...provider.dataValues,
    };
    const { ...rest } = provider;
    return rest;
  });
  providers = { ...providers };
  res.status(200).json(providers);
};

module.exports = getProvider;
