/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('impediments', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    sprint: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'sprints',
        key: 'id'
      }
    },
    task: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'tasks',
        key: 'id'
      }
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'impediments',
    timestamps: false
  })
}
