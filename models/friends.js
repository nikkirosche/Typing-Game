const initFriendsModel = (sequelize, DataTypes) => {
    return sequelize.define(
      "friends",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER,
        },
        user_id: {
          allowNull: false,
          type: DataTypes.INTEGER,
          references: {
            model: "users",
            key: "id",
          },
        },
        user2_id: {
          allowNull: false,
          type: DataTypes.INTEGER,
          references: {
            model: "users",
            key: "id",
          },
        },
        createdAt: {
          allowNull: false,
          type: DataTypes.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: DataTypes.DATE,
        },
      },
      {
        underscored: true,
      }
    );
  };
  
  module.exports = initFriendsModel;