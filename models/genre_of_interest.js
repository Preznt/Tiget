import Sequelize from "sequelize";
export default (sequelize) => {
  return sequelize.define(
    "genre_of_interest",
    {
      username: {
        type: Sequelize.DataTypes.STRING(255),
        primaryKey: true,
      },
      genre_code: {
        type: Sequelize.DataTypes.STRING(20),
        primaryKey: true,
      },
    },
    {
      sequelize,
      tableName: "genre_of_interest",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "username", name: "genre_code" }],
        },
      ],
    }
  );
};
