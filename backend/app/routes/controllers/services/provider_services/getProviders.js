const { Provider, Cars } = require("../../../../db/index");
const { typeProviderToString, statusCarToString } = require("../../../../utils/functions");

/**
 * Finds all the providers
 * @returns {provider} all the providers
 */

const getProvider = async (req, res) => {

  const { type } = req.query;

  let query = {
    where: {},
    attributes: ["id", "nombreLargo", "nombreCorto", "observaciones", "type"],
    order: [["nombreLargo", "ASC"]],
    include: [
      {
        model: Cars,
        attributes: ["id", "patente", "año", "status"],
        where: {},
        required: false,
      },
    ],
  };

  if(type) {
    query.where = {...query.where, type: type};
  }

  let providers = await Provider.findAll(query);

  providers = providers.map((provider) => {
    provider = {
      ...provider.dataValues,
      vehiculos: provider.dataValues.Cars?.map((car) => {
        car = {
          id: car.id,
          patente: car.patente,
          año: car.año,
          status: statusCarToString(car.status),
        };
        return car;
      }),
    };
    provider.type = typeProviderToString(provider.type);
    const {Cars, ...rest } = provider;
    return rest;
  });
  providers = { ...providers };
  res.status(200).json(providers);
};

module.exports = getProvider;
