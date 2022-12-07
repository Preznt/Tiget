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
      password: {
        type: Sequelize.DataTypes.STRING(255),
        allowNull: false,
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
        allowNull: true,
      },
      tel: {
        type: Sequelize.DataTypes.STRING(20),
        allowNull: true,
      },
      level: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: true,
      },
      delete_date: {
        type: Sequelize.DataTypes.STRING(255),
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "user",
      timestamps: false,
    }
  );
};
