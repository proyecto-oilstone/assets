const { Provider, Cars } = require("../../../../db/index");

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
