import { DataTypes, Model } from "sequelize";
import { sequelize } from "../models";

export default class WorkspaceMember extends Model {
  public id!: number;
  public loggedInAt!: Date;
};

WorkspaceMember.init(
  {
    // id가 기본적으로 들어있다.
    loggedInAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    modelName: "WorkspaceMember",
    tableName: "workspacemembers",
    charset: "utf8",
    collate: "utf8_general_ci", // 한글 저장
    sequelize,
  }
)