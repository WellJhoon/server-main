import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { User } from "./User.js";

export const Project = sequelize.define(
  "project",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    projectName: {
      type: DataTypes.STRING,
    },
    projectOwner: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
  }
);

Project.hasMany(User, {
  foreinkey: "projectId",
  sourceKey: "id",
});
User.belongsTo(Project, { foreignKey: "projectId", targetId: "id" });
