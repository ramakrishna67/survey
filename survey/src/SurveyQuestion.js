import React, { useState, useEffect } from 'react';

const SurveyQuestion = ({ question, questionIndex, totalQuestions, onAnswer, onNext, onPrevious, currentAnswer }) => {
  const [answer, setAnswer] = useState('');

  
  useEffect(() => {
    setAnswer(currentAnswer || ''); 
  }, [question]);

  const handleAnswerChange = (e) => {
    setAnswer(e.target.value);
    onAnswer(question.id, e.target.value);  
  };

  return (
    <div>
      <h2>{question.text} ({questionIndex}/{totalQuestions})</h2>
      {question.type === 'rating' && (
        <input
          type="number"
          max={question.scale}
          value={answer}
          onChange={handleAnswerChange}
        />
      )}
      {question.type === 'text' && (
        <textarea value={answer} onChange={handleAnswerChange} />
      )}
      <button onClick={onPrevious} disabled={questionIndex === 1}>Previous</button>
      <button onClick={onNext}>{questionIndex === totalQuestions ? 'Finish' : 'Next'}</button>
    </div>
  );
};

export default SurveyQuestion;
