import { Sequelize } from "sequelize";

module.exports = (sequelize: Sequelize, Sequelize: any) => {
  const User = sequelize.define("users", {
    id: {type: Sequelize.INTEGER, primaryKey: true},
    name: {type: Sequelize.STRING(50)},
    email: {type: Sequelize.STRING},
    password_hash: {type: Sequelize.STRING},
    created_at: {type: Sequelize.DATE},
    updated_at: {type: Sequelize.DATE},
    is_active: {type: Sequelize.BOOLEAN},
    last_login: {type: Sequelize.DATE},
    failed_login_attempts: {type: Sequelize.INTEGER},
    locked_until: {type: Sequelize.DATE}
  }, {
    timestamps: false,
  });
  return User;
};