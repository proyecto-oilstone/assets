const { Users } = require("../../../../db/index");

/**
 * Gets all the users, checks req.query for filters
 * @param {Number or String} req.query 
 * @returns {users} all the users
 */

const getUsers = async (req, res) => {
  const { rol, estado, nombre, apellido } = req.query;

  let query = {
    where: {},
    attributes: ["id", "mail", "nombre", "apellido", "telefono", "rol", "estado"],
    order: [["id", "ASC"]],
  };

  if (rol) {
    query.where = { ...query.where, rol: rol };
  }

  if (estado) {
    query.where = { ...query.where, estado: estado };
  }

  if (nombre) {
    query.where = { ...query.where, nombre: { [Op.like]: `%${nombre}%` } };
  }

  if (apellido) {
    query.where = { ...query.where, apellido: { [Op.like]: `%${apellido}%` } };
  }

  let users = await Users.findAll(query);

  users = users.map((user) => {
    user = {
      ...user.dataValues,
    };
    const { ...rest } = user;
    return rest;
  });
  users = { ...users };
  res.status(200).json(users);
};

module.exports = getUsers;
