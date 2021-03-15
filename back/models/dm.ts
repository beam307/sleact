import { DataTypes, Model } from "sequelize";
import { sequelize } from "../models";
import User from "./user";
import Workspace from "./workspace";

export default class DM extends Model {
  public id!: number;
  public content!: string;
};

DM.init(
  {
    // id가 기본적으로 들어있다.
    content: {
      type: DataTypes.TEXT, // STRING, TEXT, BOOLEAN, INTEGER, FLOAT, DATETIME
      allowNull: false, // 필수
    },
  },
  {
    modelName: "DM",
    tableName: "dms",
    charset: "utf8mb4",
    collate: "utf8mb4_general_ci", // 이모티콘 저장
    sequelize,
  }
)

DM.belongsTo(User, { as: "Sender" });
DM.belongsTo(User, { as: "Receiver" });
DM.belongsTo(Workspace);