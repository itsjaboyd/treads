// src/seeders/YYYYMMDDHHmmss-add-initial-users.ts
import { QueryInterface } from "sequelize";
import bcrypt from "bcrypt";
import { randomUUID } from "crypto";

export async function up(queryInterface: QueryInterface) {
  // Hash passwords BEFORE inserting
  const adminHash = await bcrypt.hash("ChangeMe123!", 12);
  const fleetHash = await bcrypt.hash("FleetManager1!", 12);
  const jacobHash = await bcrypt.hash("JacobPass1!", 12);
  const ryleyHash = await bcrypt.hash("RyleyPass1!", 12);
  const emilyHash = await bcrypt.hash("EmilyPass1!", 12);

  await queryInterface.bulkInsert(
    "users",
    [
      {
        id: randomUUID(),
        name: "System Administrator",
        email: "admin@fleet.local",
        password: adminHash,
        active: true,
        failed_login_attempts: 0,
        created: new Date(),
        updated: new Date(),
      },
      {
        id: randomUUID(),
        name: "Fleet Manager",
        email: "manager@fleet.local",
        password: fleetHash,
        active: true,
        failed_login_attempts: 0,
        created: new Date(),
        updated: new Date(),
      },
      {
        id: randomUUID(),
        name: "Jacob Johnson",
        email: "jacob.johnson@fleet.local",
        password: jacobHash,
        active: true,
        failed_login_attempts: 0,
        created: new Date(),
        updated: new Date(),
      },
      {
        id: randomUUID(),
        name: "Ryley Smith",
        email: "ryley.smith@fleet.local",
        password: ryleyHash,
        active: true,
        failed_login_attempts: 0,
        created: new Date(),
        updated: new Date(),
      },
      {
        id: randomUUID(),
        name: "Emily Davis",
        email: "emily.davis@fleet.local",
        password: emilyHash,
        active: true,
        failed_login_attempts: 0,
        created: new Date(),
        updated: new Date(),
      },
    ],
    {},
  );
}

export async function down(queryInterface: QueryInterface) {
  // Safely remove seeded data
  await queryInterface.bulkDelete("users", {});
}
