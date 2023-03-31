const express = require('express');
const router = express.Router();

module.exports = (connection, sessionMiddleware) => {
  // Create questions table if it doesn't exist
  const createQuestionsTable = `
  CREATE TABLE IF NOT EXISTS questions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    question TEXT NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
  );
  
  `;
  connection.query(createQuestionsTable, (error, results, fields) => {
    if (error) {
      console.log(error);
    }
  });

  // Create user_answers table if it doesn't exist
  const createUserAnswersTable = `
    CREATE TABLE IF NOT EXISTS user_answers (
      id INT PRIMARY KEY AUTO_INCREMENT,
      user_id INT,
      question_id INT,
      answer TEXT,
      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (question_id) REFERENCES questions(id)
    )`;

  connection.query(createUserAnswersTable, (error, results, fields) => {
    if (error) {
      console.log(error);
    }
  });

  router.post('/answers', sessionMiddleware, (req, res) => {
    const { answers } = req.body;
    const userId = req.session.user.id;
    console.log(req.session);
    const questions = [
      "What is your favorite color?",
      "What is your favorite food?",
      "What is your favorite hobby?"
    ];
  
    // Store the answers in the user's session
    req.session.answers = answers;
  
    // Save the answers to the SQL database
    if (Array.isArray(answers) && answers.length >= 3) {
      const query = "INSERT INTO user_answers (user_id, answer1, answer2, answer3) VALUES (?, ?, ?, ?)";
      connection.query(query, [userId, answers[0], answers[1], answers[2]], (error, results, fields) => {
        if (error) {
          console.log(error);
          res.sendStatus(500);
        } else {
          // Save the questions to the SQL database
          const questionQuery = "INSERT INTO questions (question, user_id) VALUES (?, ?)";
          connection.query(questionQuery, [questions[0], userId], (questionError, questionResults, questionFields) => {
            if (questionError) {
              console.log(questionError);
              res.sendStatus(500);
            } else {
              res.json({ success: true });
            }
          });
        }
      });
    } else {
      res.sendStatus(400);
    }
  });
  

  // Route to get the questions
  router.get('/', sessionMiddleware, (req, res) => {
    const questions = [
      "What is your favorite color?",
      "What is your favorite food?",
      "What is your favorite hobby?"
    ];
    res.json({ questions });
  });

  router.get('/answers', sessionMiddleware, (req, res) => {
    const userId = req.session.userId;

    // Query the SQL database for the user's answers
    const query = "SELECT answer1, answer2, answer3 FROM user_answers WHERE user_id = ?";
    connection.query(query, [userId], (error, results, fields) => {
      if (error) {
        console.log(error);
        res.sendStatus(500);
      } else if (results.length === 0) {
        res.json({ answers: [] });
      } else {
        const answers = [results[0].answer1, results[0].answer2, results[0].answer3];
        res.json({ answers });
      }
    });
  });

  return router;
};
