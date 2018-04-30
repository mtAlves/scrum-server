/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('sprints', {
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
      allowNull: false
    },
    backlog: {
      type: 'ARRAY',
      allowNull: false
    },
    project: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'projects',
        key: 'id'
      }
    },
    scrum_master: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    scrum_team: {
      type: 'ARRAY',
      allowNull: false
    },
    impediments: {
      type: 'ARRAY',
      allowNull: true
    }
  }, {
    tableName: 'sprints',
    timestamps: false
  })
}
