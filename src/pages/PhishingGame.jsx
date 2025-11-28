import React, { useState } from "react";

/**
 * Simple dataset: array of { id, text, isPhishing, explanation }
 * In a real app you'd fetch these from backend or use richer examples.
 */
const examples = [
  {
    id: 1,
    text: `From: billing@bank-secure.com
Subject: Immediate action required - Update your account
Dear customer, your account will be suspended. Click https://bank-secure-auth.com to verify immediately.`,
    isPhishing: true,
    explanation: "Phishing: fake domain and urgency"
  },
  {
    id: 2,
    text: `From: hr@company.com
Subject: Holiday schedule
Please see the attached holiday schedule for December.`,
    isPhishing: false,
    explanation: "Legitimate internal email"
  },
  {
    id: 3,
    text: `From: support@apple.com
Subject: Your iCloud will be terminated!
Click here http://tinyurl[.]com/verify-icloud to reactivate.`,
    isPhishing: true,
    explanation: "URL shortener used and urgent language"
  }
];

export default function PhishingGame() {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const cur = examples[index];

  function answer(isPhishing) {
    const correct = isPhishing === cur.isPhishing;
    if (correct) setScore(s => s + 1);
    setShowAnswer(true);
    setTimeout(() => {
      setShowAnswer(false);
      setIndex(i => (i + 1) % examples.length);
    }, 1800);
  }

  return (
    <div>
      <h2>Phishing Detection Game</h2>
      <div style={{ border: "1px solid #ddd", padding: 12 }}>
        <pre style={{ whiteSpace: "pre-wrap" }}>{cur.text}</pre>
      </div>

      <div style={{ marginTop: 8 }}>
        <button onClick={() => answer(true)}>Phishing</button>{" "}
        <button onClick={() => answer(false)}>Legitimate</button>
      </div>

      <div style={{ marginTop: 12 }}>
        <strong>Score:</strong> {score} / {examples.length}
      </div>

      {showAnswer && (
        <div style={{ marginTop: 8 }}>
          <strong>Answer:</strong> {cur.isPhishing ? "Phishing" : "Legitimate"}
          <div>{cur.explanation}</div>
        </div>
      )}
    </div>
  );
}
