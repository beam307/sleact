import { DataTypes, Model } from "sequelize";
import { sequelize } from "../models";
import Workspace from "./workspace";
import User from "./user";

export default class Mention extends Model {
  public id!: number;
  public category!: "chat" | "dm" | "system";
  public chatId?: string;
};

Mention.init(
  {
    // id가 기본적으로 들어있다.
    category: {
      type: DataTypes.ENUM("chat", "dm", "system"),
      allowNull: false, // 필수
    },
    chatId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    modelName: "Mention",
    tableName: "mentions",
    charset: "utf8",
    collate: "utf8_general_ci", // 한글 저장
    sequelize,
  }
)

Mention.belongsTo(Workspace);
Mention.belongsTo(User, { as: "Sender", foreignKey: "SenderId" });
Mention.belongsTo(User, { as: "Receiver", foreignKey: "ReceiverId" });