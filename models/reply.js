import Sequelize from "sequelize";
export default (sequelize) => {
  return sequelize.define(
    "reply",
    {
      board_code: {
        type: Sequelize.DataTypes.BIGINT,
        primaryKey: true,
      },
      r_nickname: {
        type: Sequelize.DataTypes.STRING(255),
        allowNull: true,
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
