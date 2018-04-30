import fs from 'fs'
import path from 'path'
import Sequelize from 'sequelize'
import config from '../config/db'

const env = process.env.NODE_ENV || 'development'
const db = {}

let sequelize
if (env === 'development') {
  sequelize = new Sequelize(config[env])
} else {
  sequelize = new Sequelize(config[env].database, config[env].username, config[env].password, {
    dialect: config[env].dialect
  })
}

fs
  .readdirSync(__dirname)
  .filter(file => (file !== 'index.js') && (file.slice(-3) === '.js'))
  .forEach(file => {
    const model = sequelize.import(path.join(__dirname, file))
    db[model.name] = model
  })

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

export default db
