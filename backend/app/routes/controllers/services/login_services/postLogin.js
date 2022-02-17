const { Users } = require("../../../../db/index");
const bcrypt = require("bcrypt");

/**
 * Check if a user exists with the email, checks if the email and password match and then sends the user info
 * @param {Object} req.body
 * @returns {user} 
 */

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
