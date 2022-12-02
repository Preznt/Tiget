import Sequelize from "sequelize";
export default (sequelize) => {
  return sequelize.define(
    "concert_of_interest",
    {
      username: {
        type: Sequelize.DataTypes.STRING(255),
        allowNull: false,
        primaryKey: true,
      },
      concert_code: {
        type: Sequelize.DataTypes.STRING(20),
        allowNull: false,
        primaryKey: true,
      },
    },
    {
      sequelize,
      tableName: "concert_of_interest",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "username", name: "concert_code" }],
        },
      ],
    }
  );
};
