import Sequelize from "sequelize";
export default (sequelize) => {
  return sequelize.define(
    "artist_genre",
    {
      artist_code: {
        type: Sequelize.DataTypes.STRING(20),
        allowNull: false,
        primaryKey: true,
      },
      genre_code: {
        type: Sequelize.DataTypes.STRING(20),
        allowNull: false,
        primaryKey: true,
      },
    },
    {
      sequelize,
      tableName: "artist_genre",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "artist_code", name: "genre_code" }],
        },
      ],
    }
  );
};
