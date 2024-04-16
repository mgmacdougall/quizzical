import React from 'react';
import QuestionSection from './QuestionSection';

function QuestionPage({viewStatus}) {
  return (
    <div className={viewStatus ? 'display' : 'hidden'}>
      <h2>Questions</h2>
    </div>
  );
}

export default QuestionPage;
