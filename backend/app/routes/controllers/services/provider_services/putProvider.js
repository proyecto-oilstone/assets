const { Provider } = require("../../../../db/index");

const putProvider = async (req, res) => {
  const { id } = req.params;
  const { nombreLargo, nombreCorto, observaciones } = req.body;
  try {
    Provider.update({ nombreLargo, nombreCorto, observaciones }, { where: { id } });
    const provider = await Provider.findOne({ where: { id } });
    res.status(200).json(provider);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = putProvider;
