const { Provider } = require("../../../../db/index");

const postProvider = async (req, res) => {
  const { nombre } = req.body;
  try {
    const provider = await Provider.create({
      nombre,
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
