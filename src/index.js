import express from 'express'
import bodyParser from 'body-parser'
import db from './models'
import { options, cors } from './config/server'
import routes from './routes/'

const app = express()
const PORT = process.env.PORT || 3000

app.set('json spaces', 2)
app.use(express.static('public', options))
app.use(cors)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

routes(app, db)

db.sequelize
  .sync()
  .then(() => app.listen(PORT, () => console.log('DB is sync and server is running at', PORT)))
  .catch(error => console.error(error))
