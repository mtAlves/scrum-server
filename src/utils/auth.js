import jwt from 'jsonwebtoken'

export default (req, res, next) => {
  try {
    const auth = req.headers.authorization
    const token = auth.startsWith('Bearer ') ? auth.split(' ')[1] : auth
    jwt.verify(token, 'scrum_secret', (err, decoded) => {
      if (decoded) {
        next()
      } else {
        res.status(401).send('Unauthorized').end()
      }
    })
  } catch (error) {
    res.status(401).send('Unauthorized').end()
  }
}
