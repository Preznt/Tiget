import Sequelize from "sequelize";
export default (sequelize) => {
  return sequelize.define(
    "genre",
    {
      genre_code: {
        type: Sequelize.DataTypes.VARCHAR(20),
        allowNull: false,
      },
      genre_name: {
        type: Sequelize.DataTypes.VARCHAR(20),
        allowNull: false,
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
          fields: [{ name: "genre_code" }],
        },
      ],
    }
  );
};
