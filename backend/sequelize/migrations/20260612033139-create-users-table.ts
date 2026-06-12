// src/migrations/YYYYMMDDHHmmss-create-users-table.ts
import { QueryInterface, DataTypes } from "sequelize";

export async function up(
  queryInterface: QueryInterface,
  Sequelize: typeof DataTypes,
) {
  await queryInterface.createTable("users", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    is_active: {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
    },
    last_login: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    failed_login_attempts: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
    locked_until: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    created: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    updated: {
      type: Sequelize.DATE,
      allowNull: false,
    },
  });

  // Add indexes for performance
  await queryInterface.addIndex("users", ["email"], { unique: true });
  await queryInterface.addIndex("users", ["is_active"]);
  await queryInterface.addIndex("users", ["locked_until"]);
}

export async function down(queryInterface: QueryInterface) {
  await queryInterface.dropTable("users");
}
