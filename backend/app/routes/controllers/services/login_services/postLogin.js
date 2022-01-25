const { Users } = require("../../../../db/index");

const postLogin = async (req, res) => {
  const { mail, contraseña } = req.body;

  let user = await Users.findOne({ where: { mail: mail } });

  if (!user) {
    return res.status(404).send("User not found");
  }

  if (user.contraseña !== contraseña) {
    return res.status(401).send("Wrong password");
  }

  user = {
    ...user.dataValues,
  };
  const { ...rest } = user;
  return res.status(200).json(rest);
};

module.exports = postLogin
