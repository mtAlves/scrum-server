const options = {
  etag: true,
  maxAge: '120',
  setHeaders: function (res, path, stat) {
    res.set('x-timestamp', Date.now())
  }
}

const cors = (req, res, next) => {
  res.append('Access-Control-Allow-Origin', ['*'])
  res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
  res.append('Access-Control-Allow-Headers', ['Content-Type', 'Authorization'])
  next()
}

export { cors, options }
