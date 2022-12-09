import Sequelize from "sequelize";
export default (sequelize) => {
  return sequelize.define(
    "user_reply",
    {
      nickname: {
        type: Sequelize.DataTypes.STRING(255),
        allowNull: false,
      },
      board_code: {
        type: Sequelize.DataTypes.BIGINT,
        allowNull: false,
      },
      profile_image: {
        type: Sequelize.DataTypes.STRING(255),
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "user_reply",
      timestamps: false,
    }
  );
};
