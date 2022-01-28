const { Users } = require("../../../../db/index");
const bcrypt = require("bcrypt");

const postUsers = async (req, res) => {
  const { mail, contraseña, nombre, apellido, telefono, rol, estado } = req.body;
  const encryptedPassword = await bcrypt.hash(contraseña, 10);

  let created = await Users.findOne({ where: { mail: mail } });
  if (created) {
    return res.status(500).send("El usuario con ese mail ya existe");
  }
  let newUser = await Users.create({
    mail,
    contraseña: encryptedPassword,
    nombre,
    apellido,
    telefono,
    rol,
    estado,
  });
  res.status(200).json(newUser);
};

module.exports = postUsers;
