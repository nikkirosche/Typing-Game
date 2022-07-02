const initWordsModel = (sequelize, DataTypes) => {
    return sequelize.define('words', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      words: {
        allowNull: false,
        type: DataTypes.STRING,
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
      underscored: true
    },
    {
      freezeTableName: true
    }
    );
  };
  
  module.exports = initWordsModel;