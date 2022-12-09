import Sequelize from "sequelize";
export default (sequelize) => {
  return sequelize.define(
    "genre_concert",
    {
      concert_code: {
        type: Sequelize.DataTypes.INTEGER,
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
