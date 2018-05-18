/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('products_backlog', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    importance: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    product: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'products',
        key: 'id'
      }
    }
  }, {
    tableName: 'products_backlog',
    timestamps: false
  });
};
