/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('projects', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    started: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    ended: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    product_owner: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    backlog: {
      type: 'ARRAY',
      allowNull: false
    }
  }, {
    tableName: 'projects',
    timestamps: false
  })
}
