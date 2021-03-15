import { DataTypes, Model } from "sequelize";
import { sequelize } from "../models";
import Workspace from "./workspace";
import WorkspaceMember from "./workspaceMember";
import Channel from "./channel";
import ChannelChat from "./channelChat";

export interface UserAttributes {
  id: number;
  email: string;
  nickname: string;
  password: string;
}

export default class User extends Model {
  public id!: number;
  public email!: string;
  public nickname!: string;
  public password!: string;
};

User.init(
  {
    // id가 기본적으로 들어있다.
    email: {
      type: DataTypes.STRING(30), // STRING, TEXT, BOOLEAN, INTEGER, FLOAT, DATETIME
      allowNull: false, // 필수
      unique: true, // 고유한 값
    },
    nickname: {
      type: DataTypes.STRING(30),
      allowNull: false, // 필수
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false, // 필수
    },
  },
  {
    modelName: "User",
    tableName: "users",
    paranoid: true,
    charset: "utf8",
    collate: "utf8_general_ci", // 한글 저장
    sequelize,
  }
)


User.hasMany(Workspace, { as: "Owned", foreignKey: "OwnerId" });
User.belongsToMany(Workspace, {
  through: WorkspaceMember,
  as: "Workspaces",
});
User.belongsToMany(Channel, { through: "ChannelMembers" });
User.hasMany(ChannelChat);