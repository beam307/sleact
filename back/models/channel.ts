import { DataTypes, HasManyAddAssociationMixin, HasManyGetAssociationsMixin, Model } from "sequelize";
import { sequelize } from "../models";
import User from "./user";
import ChannelChat from "./channelChat";
import Workspace from "./workspace";

export default class Channel extends Model {
  public id!: number;
  public name!: string;
  public private: string | undefined;
  public addMembers!: HasManyAddAssociationMixin<User, number>;
  public getMembers!: HasManyGetAssociationsMixin<User>;
  public getChats!: HasManyGetAssociationsMixin<ChannelChat>;
};

Channel.init(
  {
    // id가 기본적으로 들어있다.
    name: {
      type: DataTypes.STRING(30), // STRING, TEXT, BOOLEAN, INTEGER, FLOAT, DATETIME
      allowNull: false, // 필수
    },
    private: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
  },
  {
    modelName: "Channel",
    tableName: "channels",
    charset: "utf8",
    collate: "utf8_general_ci", // 한글 저장
    sequelize,
  }
);

Channel.belongsTo(Workspace);
Channel.hasMany(ChannelChat, { as: "Chats" });
Channel.belongsToMany(User, {
  through: "ChannelMembers",
  as: "Members",
});