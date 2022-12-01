import Sequelize from "sequelize";
export default (sequelize) => {
  return sequelize.define(
    "user",
    {
      username: {
        type: Sequelize.DataTypes.STRING(256),
        allowNull: false,
        primaryKey,
      },
      profile_image: {
        type: Sequelize.DataTypes.STRING(256),
        allowNull: true,
      },
      nickname: {
        type: Sequelize.DataTypes.STRING(20),
        allowNull: false,
      },
      birthdate: {
        type: Sequelize.DataTypes.STRING(256),
        allowNull: false,
      },
      Level: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "user",
      timestamps: false,
    }
  );
};
