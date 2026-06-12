import { DataTypes, Model, Optional } from "sequelize";
import { hashPassword } from "../utilities/crypting"; // Ensure this utility exists and is properly implemented
import sequelize from "."; // Adjust path to your Sequelize instance

// Define the complete attribute interface (runtime + type)
interface UserAttributes {
  id: string;
  name: string;
  email: string;
  password: string;
  active: boolean;
  last_login: Date | null;
  failed_login_attempts: number;
  locked_until: Date | null;
  created: Date;
  updated: Date;
}

// Define creation attributes (marking fields that shouldn't be required on insert)
interface UserCreationAttributes extends Optional<
  UserAttributes,
  "id" | "last_login" | "locked_until" | "created" | "updated"
> {}

// Create the model class
class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: string;
  public name!: string;
  public email!: string;
  public password!: string;
  public active!: boolean;
  public last_login!: Date | null;
  public failed_login_attempts!: number;
  public locked_until!: Date | null;
  public created!: Date;
  public updated!: Date;
}

// Initialize the model with PostgreSQL-compatible types
User.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    last_login: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    failed_login_attempts: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    locked_until: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    created: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updated: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "users",
    timestamps: true,
    createdAt: "created",
    updatedAt: "updated",
    indexes: [
      { fields: ["id"], unique: true },
      { fields: ["email"], unique: true },
      { fields: ["active"] },
      { fields: ["locked_until"] },
    ],
  },
);

// Security & Business Logic Hooks
User.addHook("beforeCreate", async (user: User) => {
  // Hash password before saving
  user.password = await hashPassword(user.password);
});

User.addHook("beforeUpdate", async (user: User) => {
  // Only hash if password is actually being changed
  if (user.changed("password")) {
    user.password = await hashPassword(user.password);
  }

  // Auto-unlock accounts past their lock expiry
  if (user.locked_until && user.locked_until <= new Date()) {
    user.locked_until = null;
    user.failed_login_attempts = 0;
  }
});

// Export for use in routes/services
export default User;
