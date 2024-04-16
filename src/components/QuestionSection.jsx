import React from 'react';

function QuestionSection({data, answerId, handler}) {
  console.log(data);
  return (
    <div>
      <p>
        {data.question}
      </p>
      {data.answerArray.map((e, idx) =>
        <button id={`${answerId}_${idx}`} value={e} onClick={e => handler(e)}>
          {e}
        </button>
      )}
    </div>
  );
}

export default QuestionSection;
