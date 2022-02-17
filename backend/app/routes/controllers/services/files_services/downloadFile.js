var stream = require("stream");
const { Files } = require("../../../../db/index");

/**
 * Finds a file by id, makes it into a stream and sends it to the client
 * @param {Number} req.params.id 
 * @returns {File} response with the file 
 */

const downloadFiles = async (req, res) => {
  const { id } = req.params;
  try {
    Files.findOne({ where: { id } }).then(file => {
		var fileContents = Buffer.from(file.data, "base64");
		var readStream = new stream.PassThrough();
		readStream.end(fileContents);
		
		res.set('Content-disposition', 'attachment; filename=' + file.name);
		res.set('Content-Type', file.type);

		readStream.pipe(res);
  })}catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = downloadFiles
