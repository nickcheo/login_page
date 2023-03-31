const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);

const register = require('../backend/routes/register');
const login = require('../backend/routes/login');
const question = require('../backend/routes/question');
const test = require('../backend/routes/test');

const app = express();

// Create a MySQL connection
const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'nicholas2659',
  database: 'sys'
});

connection.connect((err) => {
  if (err) {
    console.log('Error connecting to MySQL database', err);
    process.exit(1);
  }

  console.log('Connected to MySQL database');
});

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
  },
  createDatabaseTable: true // create table if it doesn't exist
};

const sessionStore = new MySQLStore(options);

const sessionMiddleware = session({
  secret: 'your-secret-key',
  resave: true,
  saveUninitialized: true,
  store: sessionStore,
  cookie: {
    path : '/',
    httpOnly: false,
    maxAge: 60 * 60 * 1000 // 1 hour in milliseconds
  }
});



// Middleware
app.use(sessionMiddleware);
app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
  

// Mount your routes
app.use('/api/auth', login(connection, sessionMiddleware));
app.use('/api/users', register(connection));
app.use('/api/questions', question(connection, sessionMiddleware));
app.use('/test', test(connection, sessionMiddleware));

// Start the server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
