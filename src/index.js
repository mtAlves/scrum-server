import express from 'express'
import bodyParser from 'body-parser'
import db from './models'
import entryPoint from './routes/entry-point'
import users from './routes/users'
import projects from './routes/projects'
import sprints from './routes/sprints'
import tasks from './routes/tasks'
import impediments from './routes/impediments'
import auth from './routes/auth'
import { options, cors } from './config/server'

const app = express()
const PORT = process.env.PORT || 3000

app.set('json spaces', 2)
app.set('view engine', 'ejs')
app.use(express.static('public', options))
app.use(cors)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/', entryPoint)
app.use('/auth', auth(db.users))
app.use('/users', users(db.users))
app.use('/projects', projects(db.projects))
app.use('/sprints', sprints(db.sprints))
app.use('/tasks', tasks(db.tasks))
app.use('/impediments', impediments(db.impediments))

db.sequelize
  .sync()
  .then(() => app.listen(PORT, () => console.log('DB is sync and server is running at', PORT)))
  .catch(error => console.error(error))
