import Sequelize from "sequelize";
export default (sequelize) => {
  return sequelize.define(
    "artist_of_interest",
    {
      username: {
        type: Sequelize.DataTypes.STRING(256),
        allowNull: false,
        primaryKey: true,
      },
      artist_code: {
        type: Sequelize.DataTypes.STRING(20),
        allowNull: false,
        primaryKey: true,
      },
    },
    {
      sequelize,
      tableName: "artist_of_interest",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "username", name: "artist_code" }],
        },
      ],
    }
  );
};
