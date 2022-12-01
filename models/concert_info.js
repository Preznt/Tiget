import Sequelize from "sequelize";
export default (sequelize) => {
  return sequelize.define(
    "concert_info",
    {
      concert_code: {
        type: Sequelize.DataTypes.INTEGER,
        primarykey,
      },
      concert_name: {
        type: Sequelize.DataTypes.STRING(125),
        allowNull: false,
      },
      concert_artist: {
        type: Sequelize.DataTypes.STRING(125),
        allowNull: false,
      },
      concert_poster: {
        type: Sequelize.DataTypes.STRING(256),
        allowNull: true,
      },
      start_date: {
        type: Sequelize.DataTypes.STRING(125),
        allowNull: false,
      },
      end_date: {
        type: Sequelize.DataTypes.STRING(125),
        allowNull: false,
      },
      concert_place: {
        type: Sequelize.DataTypes.STRING(125),
        allowNull: false,
      },
      price: {
        type: Sequelize.DataTypes.STRING(125),
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "concert_info",
      timestamps: false,
    }
  );
};
