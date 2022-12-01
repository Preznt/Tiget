import Sequelize from "sequelize";
export default (sequelize) => {
  return sequelize.define(
    "genre_concert",
    {
      concert_code: {
        type: Sequelize.DataTypes.VARCHAR(20),
        allowNull: false,
      },
      genre_code: {
        type: Sequelize.DataTypes.VARCHAR(20),
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "genre_concert",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "concert_code", name: "genre_code" }],
        },
      ],
    }
  );
};
