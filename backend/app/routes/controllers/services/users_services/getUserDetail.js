const { Users } = require("../../../../db/index");

/**
 * Finds user by id
 * @param {Number} req.params.id  
 * @returns {user} with information
 */

const getUserDetail = async (req, res) => {
  const { id } = req.params;
  let query = {
    where: { id },
    attributes: ["id", "mail", "nombre", "apellido", "telefono", "rol", "estado"],
  };
  let user = await Users.findOne(query);

  if (!user) {
    return res.status(404).send("User not found");
  }
  user = {
    id: user.id,
    mail: user.mail,
    nombre: user.nombre,
    apellido: user.apellido,
    telefono: user.telefono,
    rol: user.rol,
    estado: user.estado,
  };
  res.status(200).json(user);
};

module.exports = getUserDetail
