import React, { useState } from "react";
import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:3001',
});

function Questions() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // Load questions from the server
  const loadQuestions = async () => {
    const response = await instance.get("/api/questions");
    setQuestions(response.data.questions);
  };

  // Submit answers to the server
  const submitAnswers = async () => {
    const response = await instance.post("/api/questions/answers", { answers });
    console.log(response.data);
  };

  // Handle answer input
  const handleAnswerChange = (event) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = event.target.value;
    setAnswers(newAnswers);
  };

  // Handle next question button click
  const handleNextQuestion = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  // Render the current question and answer input
  const renderQuestion = () => {
    const question = questions[currentQuestionIndex];
    const answer = answers[currentQuestionIndex] || "";
    return (
      <div>
        <h2>{question}</h2>
        <input type="text" value={answer} onChange={handleAnswerChange} />
      </div>
    );
  };

  // Render the submit button or the next question button
  const renderButton = () => {
    if (currentQuestionIndex === questions.length - 1) {
      return <button onClick={submitAnswers}>Submit</button>;
    } else {
      return <button onClick={handleNextQuestion}>Next Question</button>;
    }
  };

  // Load questions when the component mounts
  React.useEffect(() => {
    loadQuestions();
  }, []);

  return (
    <div>
      {renderQuestion()}
      {renderButton()}
    </div>
  );
}

export default Questions;
