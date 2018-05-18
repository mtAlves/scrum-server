/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('sprints_backlog', {
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
    sprint: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'sprints',
        key: 'id'
      }
    }
  }, {
    tableName: 'sprints_backlog',
    timestamps: false
  });
};
