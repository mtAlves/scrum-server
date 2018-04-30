import { Router } from 'express'
import path from 'path'

export default Router().get('/', (req, res, next) => {
  const host = req.headers.host
  const endPoints = [
    {name: 'Users', url: `http://${host}/users/`},
    {name: 'Projects', url: `http://${host}/projects/`},
    {name: 'Sprints', url: `http://${host}/sprints/`},
    {name: 'Tasks', url: `http://${host}/tasks/`}
  ]
  res.render(path.join(__dirname, '../views', 'entry-point.ejs'), {endPoints})
})
