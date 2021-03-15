import { DataTypes, Model } from "sequelize";
import { sequelize } from "../models";
import User from "./user";
import Channel from "./channel";

export default class ChannelChat extends Model {
  public id!: number;
  public content!: string;
};

ChannelChat.init(
  {
    content: {
      type: DataTypes.TEXT, // STRING, TEXT, BOOLEAN, INTEGER, FLOAT, DATETIME
      allowNull: false, // 필수
    },
  },
  {
    modelName: 'ChannelChat',
    tableName: 'channelChats',
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci', // 이모티콘 저장
    sequelize,
  }
)

ChannelChat.belongsTo(User);
ChannelChat.belongsTo(Channel);