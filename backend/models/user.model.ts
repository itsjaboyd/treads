import { Sequelize, DataTypes } from "sequelize";

module.exports = (sequelize: Sequelize, Sequelize: any) => {
  return sequelize.define(
    "Users",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: DataTypes.STRING(50),
      email: { type: DataTypes.STRING, allowNull: false, unique: true },
      password_hash: { type: DataTypes.STRING, allowNull: false },
      is_active: { type: DataTypes.BOOLEAN, defaultValue: true },
      last_login: DataTypes.DATE,
      failed_login_attempts: { type: DataTypes.INTEGER, defaultValue: 0 },
      locked_until: DataTypes.DATE,
    },
    {
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  );
};
