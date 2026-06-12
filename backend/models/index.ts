require("dotenv").config();
const config = require("../config/db.config");
const Sequelize = require("sequelize");

const environment = process.env.NODE_ENV || "development";
const sequelize = new Sequelize(
  config[environment].database,
  config[environment].username,
  config[environment].password,
  {
    host: config[environment].host,
    port: config[environment].port,
    dialect: config[environment].dialect,
    pool: {
      max: config[environment].pool.max,
      min: config[environment].pool.min,
      acquire: config[environment].pool.acquire,
      idle: config[environment].pool.idle,
    },
  },
);

// const db = {
//   Sequelize: Sequelize,
//   sequelize: sequelize,
//   user: require("../models/user.model")(sequelize, Sequelize),
//   role: require("../models/role.model")(sequelize, Sequelize),
//   ROLES: ["user", "admin", "moderator"],
// };

// db.role.belongsToMany(db.user, {
//   through: "user_roles",
// });
// db.user.belongsToOne(db.role, {
//   through: "user_roles",
// });

export default sequelize;
