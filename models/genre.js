import Sequelize from "sequelize";
export default (sequelize) => {
  return sequelize.define(
    "genre",
    {
      genre_code: {
        type: Sequelize.DataTypes.STRING(20),
        allowNull: false,
        primaryKey: true,
      },
      genre_name: {
        type: Sequelize.DataTypes.STRING(20),
        allowNull: false,
        primaryKey: true,
      },
    },
    {
      sequelize,
      tableName: "genre",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "genre_code", name: "genre_name" }],
        },
      ],
    }
  );
};
