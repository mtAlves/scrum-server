/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
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
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'products',
        key: 'id'
      }
    },
    scrum_master_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    }
  }, {
    tableName: 'sprints',
    timestamps: false
  });
};
