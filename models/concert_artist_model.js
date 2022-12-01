import Sequelize from "sequelize";
export default (sequelize) => {
  return sequelize.define(
    "concert_artist",
    {
      concert_code: {
        type: Sequelize.DataTypes.STRING(20),
        allowNull: false,
      },
      artist_code: {
        type: Sequelize.DataTypes.STRING(20),
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "concert_artist",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "concert_code", name: "artist_code" }],
        },
      ],
    }
  );
};
