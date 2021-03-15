import {
  DataTypes,
  HasManyAddAssociationMixin,
  HasManyGetAssociationsMixin,
  HasManyRemoveAssociationMixin,
  Model
} from "sequelize";
import { sequelize } from "../models";
import User from "./user";
import WorkspaceMember from "./workspaceMember";
import Channel from "./channel";
import DM from "./dm";

export default class Workspace extends Model {
  public id!: number;
  public name!: string;
  public url!: string;
  public addMembers!: HasManyAddAssociationMixin<User, number>;
  public getChannels!: HasManyGetAssociationsMixin<Channel>;
  public getDMs!: HasManyGetAssociationsMixin<DM>;
  public getMembers!: HasManyGetAssociationsMixin<User>;
  public removeMembers!: HasManyRemoveAssociationMixin<User, number>;
  public readonly Channels!: Channel[];
};

Workspace.init(
  {
    // id가 기본적으로 들어있다.
    name: {
      type: DataTypes.STRING(30), // STRING, TEXT, BOOLEAN, INTEGER, FLOAT, DATETIME
      allowNull: false, // 필수
      unique: true, // 고유한 값
    },
    url: {
      type: DataTypes.STRING(30),
      allowNull: false, // 필수
      unique: true, // 고유한 값
    },
  },
  {
    modelName: "Workspace",
    tableName: "workspaces",
    paranoid: true,
    charset: "utf8",
    collate: "utf8_general_ci", // 한글 저장
    sequelize,
  }
)


Workspace.belongsTo(User, { as: "Owner", foreignKey: "OwnerId" });
Workspace.belongsToMany(User, {
  through: WorkspaceMember,
  as: "Members",
});
Workspace.hasMany(Channel);
Workspace.hasMany(DM);