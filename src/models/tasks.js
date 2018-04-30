/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('tasks', {
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
    sprint: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'sprints',
        key: 'id'
      }
    },
    impediments: {
      type: 'ARRAY',
      allowNull: true
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'tasks',
    timestamps: false
  })
}
