const { Files } = require("../../../../db/index");

/**
 * Creates a new File, with document as "Image" and sets it to a car
 * @param {Object} req.body
 * @param {Object} req.file
 * @returns message of the operation
 */

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
