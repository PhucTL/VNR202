import React, { useState } from 'react';

export default function Quiz({ question, options = [], onCorrect, onWrong }) {
  const [answer, setAnswer] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const submit = () => {
    setSubmitted(true);
    if (answer === question.correct) {
      onCorrect && onCorrect();
    } else {
      onWrong && onWrong();
    }
  };

  const isCorrect = answer === question.correct;

  return (
    <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-200 shadow-lg">
      <div className="text-slate-800 font-semibold text-lg mb-4">{question.text}</div>
      <div className="mt-4 grid gap-3">
        {options.map((opt) => (
          <button
            key={opt.value}
            disabled={submitted}
            className={`text-left p-4 rounded-xl border-2 transition-all duration-200 ${
              submitted && opt.value === question.correct && isCorrect
                ? 'border-green-500 bg-green-100 text-green-800'
                : submitted && answer === opt.value && !isCorrect
                ? 'border-red-500 bg-red-100 text-red-800'
                : answer === opt.value
                ? 'border-blue-500 bg-blue-100 text-blue-800'
                : 'border-slate-200 bg-white hover:border-blue-300 hover:bg-blue-50'
            } ${submitted ? 'cursor-not-allowed' : 'cursor-pointer'}`}
            onClick={() => !submitted && setAnswer(opt.value)}
          >
            <div className="font-semibold flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-current bg-opacity-20 flex items-center justify-center text-sm font-bold">
                {opt.value}
              </span>
              {opt.label}
              {submitted && opt.value === question.correct && isCorrect && (
                <span className="ml-auto text-green-600">✓</span>
              )}
              {submitted && answer === opt.value && !isCorrect && (
                <span className="ml-auto text-red-600">✗</span>
              )}
            </div>
          </button>
        ))}
      </div>

      <div className="mt-6 flex gap-3">
        <button 
          className={`px-6 py-3 rounded-xl font-semibold transition-all ${
            !answer || submitted
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700 transform hover:scale-105'
          }`}
          onClick={submit}
          disabled={!answer || submitted}
        >
          {submitted ? 'Đã nộp' : 'Nộp bài'}
        </button>
        
        {submitted && (
          <button
            className="px-6 py-3 bg-gray-500 text-white rounded-xl hover:bg-gray-600 transition-all"
            onClick={() => {
              setAnswer(null);
              setSubmitted(false);
            }}
          >
            Làm lại
          </button>
        )}
      </div>

      {submitted && isCorrect && (
        <div className="mt-4 p-4 rounded-xl bg-green-100 border border-green-300">
          <div className="font-semibold mb-2 text-green-800">
            🎉 Chính xác!
          </div>
          <div className="text-sm leading-relaxed text-green-700">
            <strong>Giải thích:</strong> {question.explanation}
          </div>
        </div>
      )}
      
      {submitted && !isCorrect && (
        <div className="mt-4 p-4 rounded-xl bg-orange-100 border border-orange-300">
          <div className="font-semibold text-orange-800">
            💪 Đừng nản chí! Hãy thử lại nhé!
          </div>
        </div>
      )}
    </div>
  );
}
