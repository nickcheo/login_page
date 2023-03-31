const express = require('express');
const router = express.Router();

module.exports = (connection, sessionMiddleware) => {
  router.get('/', sessionMiddleware, (req, res) => {
    console.log("don't fucking play");
    console.log(req.session.user);
    res.send('Test page');
  });

  return router;
};
