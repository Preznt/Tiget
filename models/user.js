import Sequelize from "sequelize";
export default (sequelize) => {
  return sequelize.define(
    "user",
    {
      username: {
        type: Sequelize.DataTypes.STRING(255),
        allowNull: false,
        primaryKey: true,
      },
      profile_image: {
        type: Sequelize.DataTypes.STRING(255),
        allowNull: true,
      },
      nickname: {
        type: Sequelize.DataTypes.STRING(20),
        allowNull: false,
      },
      birthdate: {
        type: Sequelize.DataTypes.STRING(255),
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
