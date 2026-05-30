import { Sequelize } from "sequelize";

module.exports = (sequelize: Sequelize, Sequelize: any) => {
  const User = sequelize.define("users", {
    username: {type: Sequelize.STRING(50)},
    name: {type: Sequelize.STRING(50)},
    email: {type: Sequelize.STRING(50)}
  }, {
    timestamps: false,
  });
  return User;
};