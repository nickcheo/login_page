const express = require('express');
const router = express.Router();

module.exports = (connection) => {

  router.get('/', (req, res) => {
    connection.query('SELECT * FROM users', (err, results) => {
      if (err) {
        console.log('Error fetching users from database', err);
        res.status(500).json({ message: 'Error fetching users from database' });
        return;
      }

      res.json(results);
    });
  });

  router.post('/', (req, res) => {
    const { username, email, password } = req.body;

    connection.query(
      'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
      [username, email, password],
      (err, result) => {
        if (err) {
          console.log('Error adding user to database', err);
          res.status(500).json({ message: 'Error adding user to database' });
          return;
        }

        const userId = result.insertId; // Get the ID of the newly inserted user
        res.json({ message: 'User added to database', userId });
      }
    );
  });

  return router;
};
