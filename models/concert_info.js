import Sequelize from "sequelize";
export default (sequelize) => {
  return sequelize.define(
    "concert_info",
    {
      concert_code: {
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      concert_name: {
        type: Sequelize.DataTypes.STRING(125),
        allowNull: false,
      },
      concert_poster: {
        type: Sequelize.DataTypes.STRING(255),
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
      concert_loc: {
        type: Sequelize.DataTypes.STRING(20),
        allowNull: false,
      },
      concert_ticketing: {
        type: Sequelize.DataTypes.STRING(225),
        allowNull: true,
      },
      concert_type: {
        type: Sequelize.DataTypes.STRING(20),
        allowNull: true,
      },
      concert_views: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: true,
        default: 0,
      },
    },
    {
      sequelize,
      tableName: "concert_info",
      timestamps: false,
    }
  );
};
