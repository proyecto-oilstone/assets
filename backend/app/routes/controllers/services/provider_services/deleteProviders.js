const { Provider, Cars } = require("../../../../db/index");

/**
 * Finds a Provider by id, checks if it exists, checks if its assigned to a vehicle, if its not assigned it deletes the provider
 * @param {Number} req.params.id  
 * @returns message with the result of the operation
 */

const deleteProvider = async (req, res) => {
  const { id } = req.params;
  try {
    const car = await Cars.findOne({ where: { ProviderId: id } });
    const provider = await Provider.findOne({ where: { id } });

    if (!provider) {
      return res.status(500).send("El proveedor no existe");
    }
    if (!car) {
      await Provider.destroy({ where: { id } });
      return res.status(200).json({ message: "Provider deleted" });
    }
    res.status(500).send("El proveedor no puede ser eliminado porque esta asignado a un vehiculo");
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = deleteProvider;
