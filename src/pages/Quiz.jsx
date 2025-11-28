import React, { useEffect, useState } from "react";
import { fetchQuiz } from "../utils/api";

export default function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [done, setDone] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    async function load() {
      const data = await fetchQuiz();
      setQuestions(data);
    }
    load();
  }, []);

  function select(qid, choice) {
    setAnswers(a => ({ ...a, [qid]: choice }));
  }

  function submit() {
    let s = 0;
    questions.forEach(q => {
      if (answers[q.id] === q.correct) s++;
    });
    setScore(s);
    setDone(true);
  }

  if (!questions.length) return <div>Loading quiz…</div>;

  return (
    <div>
      <h2>Cyber Quiz</h2>
      {questions.map(q => (
        <div key={q.id} style={{ marginBottom: 12 }}>
          <div><strong>{q.question}</strong></div>
          <div>
            {q.choices.map((c, i) => (
              <div key={i}>
                <label>
                  <input type="radio" name={`q${q.id}`} checked={answers[q.id] === c} onChange={() => select(q.id, c)} />
                  {" "}{c}
                </label>
              </div>
            ))}
          </div>
          {done && <div style={{ color: answers[q.id] === q.correct ? "green" : "red" }}>
            Answer: {q.correct}
          </div>}
        </div>
      ))}
      <div>
        <button onClick={submit}>Submit</button>
      </div>
      {done && <div style={{ marginTop: 12 }}><strong>Score:</strong> {score} / {questions.length}</div>}
    </div>
  );
}
