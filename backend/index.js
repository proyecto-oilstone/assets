
require("dotenv").config();

const app = require("./server")

const { db } = require("./app/db/index");

db.sequelize
  .sync({ alter: true })
  .then(() => console.log("conexion a bd exitosa!"))
  .catch((e) => console.log(e));

const port = process.env.BACKEND_PORT || 3000;

app.listen(port, () => console.log(`listening on port ${port}`));
