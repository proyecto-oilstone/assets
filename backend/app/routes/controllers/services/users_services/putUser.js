const { Users } = require("../../../../db/index");

/**
 * Finds a user by id, and updates it
 * @param {Number} req.params.id
 * @param {Object} req.body
 * @returns {user} with the updated information
 */

const putUser = async (req, res) => {
  const { id } = req.params;
  const { mail, contraseña, nombre, apellido, telefono, rol, estado } = req.body;

  try {
    await Users.update({ mail, contraseña, nombre, apellido, telefono, rol, estado }, { where: { id } });
    const user = await Users.findOne({ where: { id } });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = putUser
