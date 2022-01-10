const { Provider } = require("../../../../db/index");

const postProvider = async (req, res) => {
  const { nombreLargo, nombreCorto, observaciones } = req.body;
  try {
    const provider = await Provider.create({
      nombreLargo,
      nombreCorto,
      observaciones
    });

    res.status(200).json({
      message: "Provider created",
      provider,
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = postProvider;
