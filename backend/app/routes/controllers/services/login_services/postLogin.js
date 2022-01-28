const { Users } = require("../../../../db/index");
const bcrypt = require("bcrypt");

const postLogin = async (req, res) => {
  const { mail, contraseña } = req.body;

  let user = await Users.findOne({ where: { mail: mail } });

  if (!user) {
    return res.status(404).send("User not found");
  }

  if (user.contraseña ) {
    bcrypt.compare(contraseña, user.contraseña, (err, result) => {
      if (result) {
        return res.status(200).send(user={
          id: user.id,
          mail: user.mail,
          nombre: user.nombre,
          apellido: user.apellido,
          telefono: user.telefono,
          rol: user.rol,
          estado: user.estado,
        });
      } else {
        return res.status(500).send("Wrong password");
      }
    });
  }

  
};

module.exports = postLogin
