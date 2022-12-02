import Sequelize from "sequelize";
export default (sequelize) => {
  return sequelize.define(
    "image",
    {
      i_seq: {
        type: Sequelize.DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      i_url: {
        type: Sequelize.DataTypes.STRING(256),
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "image",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "i_seq" }],
        },
      ],
    }
  );
};
