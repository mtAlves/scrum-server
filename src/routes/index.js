import fs from 'fs'
import path from 'path'

export default (app, db) => {
  fs.readdirSync(__dirname)
  .filter(file => (file !== 'index.js') && (file.includes('route.js')))
  .forEach(file => {
    const name = file.split('.')[0]
    const route = require(path.join(__dirname, file))
    app.use(`/${name}`, route(db[`${name}`]))
  })
}
