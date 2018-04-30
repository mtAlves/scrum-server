export default {

  development: {
    storage: 'devDB.sqlite3',
    dialect: 'sqlite',
    logging: false
  },

  production: {
    username: 'postgres',
    password: process.env.DBSECRET,
    database: 'scrum',
    host: 'localhost',
    dialect: 'postgres'
  }

}
