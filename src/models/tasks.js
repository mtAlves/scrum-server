/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
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
    sprint_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'sprints',
        key: 'id'
      }
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    sprint_backlog_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'sprints_backlog',
        key: 'id'
      }
    }
  }, {
    tableName: 'tasks',
    timestamps: false
  });
};
