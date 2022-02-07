const { Files } = require("../../../../db/index");

const postFile = async (req, res) => {
  const { document, CarId } = req.body;

  try {
    const filesasd = req.files.map((file) => {
      Files.create({
        name: file.originalname,
        type: file.mimetype,
        data: file.buffer,
        document,
        CarId,
      });
    });

    res.status(200).json({
      message: "Files uploaded successfully!",
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = postFile;
