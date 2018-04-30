import jwt from 'jsonwebtoken'

export default (req, res, next) => {
  try {
    const auth = req.headers.authorization
    const token = auth.startsWith('Bearer ') ? auth.split(' ')[1] : auth
    jwt.verify(token, 'scrum_secret', (err, decoded) => {
      if (decoded) {
        next()
      } else {
        res.send('Unauthorized').status(401).end()
      }
    })
  } catch (error) {
    res.send('Unauthorized').status(401).end()
  }
}
