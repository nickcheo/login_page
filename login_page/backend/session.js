const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);

const options = {
  host: '127.0.0.1',
  user: 'root',
  password: 'nicholas2659',
  database: 'session_db',
  schema: {
    tableName: 'sessions',
    columnNames: {
      session_id: 'session_id',
      expires: 'expires',
      data: 'data'
    }
  }
};

const sessionStore = new MySQLStore(options);

const sessionMiddleware = session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  store: sessionStore
});

module.exports = sessionMiddleware;
