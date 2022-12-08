import Sequelize from "sequelize";
export default (sequelize) => {
  return sequelize.define(
    "reply",
    {
      r_seq: {
        type: Sequelize.DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },
      board_code: {
        type: Sequelize.DataTypes.BIGINT,
        primaryKey: false,
      },
      username: {
        type: Sequelize.DataTypes.STRING(255),
        allowNull: false,
      },
      nickname: {
        type: Sequelize.DataTypes.STRING(255),
        allowNull: false,
      },
      r_content: {
        type: Sequelize.DataTypes.TEXT,
        allowNull: false,
      },
      b_img: {
        type: Sequelize.DataTypes.STRING(255),
        allowNull: true,
      },
      r_update_date: {
        type: Sequelize.DataTypes.STRING(255),
        allowNull: true,
      },
      r_modified_date: {
        type: Sequelize.DataTypes.STRING(255),
        allowNull: true,
      },
      r_remove_date: {
        type: Sequelize.DataTypes.STRING(255),
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "reply",
      timestamps: false,
    }
  );
};
