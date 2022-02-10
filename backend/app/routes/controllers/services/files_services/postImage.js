const { Files } = require("../../../../db/index");

const postImage = async (req, res) => {
  const { mimetype, originalname, buffer } = req.file;

  const { document, CarId, expirationDate } = req.body;

  try {
    const img = await Files.create({
      name: originalname,
      type: mimetype,
      data: buffer,
      document: "Image",
      CarId,
    });
    res.status(200).json({
      message: "Files uploaded successfully!",
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = postImage;
