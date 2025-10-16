import React, { useState } from 'react';

export default function Quiz({ question, options = [], onCorrect, onWrong }) {
  const [answer, setAnswer] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const submit = () => {
    setSubmitted(true);
    if (answer === question.correct) onCorrect();
    else onWrong && onWrong();
  };

  return (
    <div className="p-4">
      <div className="text-slate-800 font-medium">{question.text}</div>
      <div className="mt-3 grid gap-2">
        {options.map((opt) => (
          <button
            key={opt.value}
            className={`text-left p-3 rounded-md border ${answer === opt.value ? 'border-blue-500 bg-blue-50' : 'border-slate-200 bg-white'}`}
            onClick={() => setAnswer(opt.value)}
          >
            <div className="font-semibold">{opt.value}. {opt.label}</div>
          </button>
        ))}
      </div>

      <div className="mt-4 flex gap-2">
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md" onClick={submit}>Nộp</button>
      </div>

      {submitted && answer !== question.correct && (
        <div className="mt-3 text-sm text-red-600">Sai rồi — hãy thử lại sau khi xem lại nội dung.</div>
      )}
    </div>
  );
}
