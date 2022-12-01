import Sequelize from "sequelize";
export default (sequelize) => {
  return sequelize.define(
    "artist",
    {
      artist_code: {
        type: Sequelize.DataTypes.STRING(20),
        allowNull: false,
        primaryKey: true,
      },
      artist_name: {
        type: Sequelize.DataTypes.STRING(125),
        allowNull: false,
      },
      artist_type: {
        type: Sequelize.DataTypes.STRING(20),
        allowNull: true,
      },
      artist_img: {
        type: Sequelize.DataTypes.STRING(256),
        allowNull: true,
      },
      artist_debut: {
        type: Sequelize.DataTypes.STRING(12),
        allowNull: true,
      },
      artist_genre: {
        type: Sequelize.DataTypes.STRING(20),
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "artist",
      timestamps: false,
    }
  );
};