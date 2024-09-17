import React, { useState, useEffect } from "react";
import SurveyQuestion from "./SurveyQuestion";
import WelcomeScreen from "./WelcomeScreen";
import ConfirmationDialog from "./ConfirmationDialog";
import ThankYouScreen from "./ThankYouScreen";
import "./App.css";

const questions = [
  {
    id: 1,
    text: "How satisfied are you with our products?",
    type: "rating",
    scale: 5,
  },
  {
    id: 2,
    text: "How fair are the prices compared to similar retailers?",
    type: "rating",
    scale: 5,
  },
  {
    id: 3,
    text: "How satisfied are you with the value for money of your purchase?",
    type: "rating",
    scale: 5,
  },
  {
    id: 4,
    text: "On a scale of 1-10 how would you recommend us to your friends and family?",
    type: "rating",
    scale: 10,
  },
  { id: 5, text: "What could we do to improve our service?", type: "text" },
];

const App = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [sessionId, setSessionId] = useState(null);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const session = Date.now(); //timestamp is the session id
    setSessionId(session);
  }, []);

  const handleStart = () => {
    setStep(1);
  };

  const handleAnswer = (questionId, answer) => {
    setAnswers({ ...answers, [questionId]: answer });

    const sessionData = JSON.parse(localStorage.getItem(sessionId)) || {};
    sessionData.answers = { ...sessionData.answers, [questionId]: answer };
    localStorage.setItem(sessionId, JSON.stringify(sessionData));
  };

  const handleNext = () => {
    setStep(step + 1);
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };

  const handleSubmit = () => {
    const sessionData = JSON.parse(localStorage.getItem(sessionId)) || {};
    sessionData.answers = answers;
    sessionData.status = "COMPLETED";
    localStorage.setItem(sessionId, JSON.stringify(sessionData));

    setCompleted(true);
  };

  if (completed) {
    return <ThankYouScreen />;
  }

  return (
    <div className="background">
      {step === 0 ? (
        <WelcomeScreen onStart={handleStart} />
      ) : step > questions.length ? (
        <ConfirmationDialog
          onConfirm={handleSubmit}
          onCancel={() => setStep(step - 1)}
        />
      ) : (
        <SurveyQuestion
          question={questions[step - 1]}
          questionIndex={step}
          totalQuestions={questions.length}
          currentAnswer={answers[questions[step - 1].id]}
          onAnswer={handleAnswer}
          onNext={handleNext}
          onPrevious={handlePrevious}
        />
      )}
    </div>
  );
};

export default App;
