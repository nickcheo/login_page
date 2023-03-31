const express = require('express');
const router = express.Router();

module.exports = (connection, sessionMiddleware) => {
  router.post('/', (req, res, next) => {
    const { email, password } = req.body;

    connection.query(
      'SELECT * FROM users WHERE email = ? AND password = ?',
      [email, password],
      (err, results) => {
        if (err) {
          console.log('Error fetching user from database', err);
          res.status(500).json({ message: 'Error fetching user from database' });
          return;
        }

        if (results.length === 0) {
          res.status(401).json({ message: 'Incorrect email or password' });
          return;
        }

        const user = results[0];
        req.session.user = user; // store user information in the session
        req.session.save();
        console.log(req.session);
        console.log(req.session.cookie);
        res.json({ message: 'Login successful', user });
        next();
      }
    );
  });

  return router;
};
