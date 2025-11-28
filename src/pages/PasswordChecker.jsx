import React, { useState } from "react";

function scorePassword(pw) {
  let score = 0;
  if (!pw) return { score, strength: "Empty", suggestions: [] };
  const suggestions = [];

  if (pw.length >= 12) score += 40; else if (pw.length >= 8) score += 20;
  if (/[a-z]/.test(pw) && /[A-Z]/.test(pw)) score += 20; else if (/[a-zA-Z]/.test(pw)) score += 10;
  if (/\d/.test(pw)) score += 20;
  if (/[^A-Za-z0-9]/.test(pw)) score += 20;

  // weak patterns
  if (/1234|password|qwerty|abcd|1111/.test(pw.toLowerCase())) {
    suggestions.push("Avoid common sequences or 'password'-like words");
    score = Math.max(0, score - 30);
  }
  if (pw.length < 8) suggestions.push("Use at least 8 characters (12+ recommended)");
  if (!/[^A-Za-z0-9]/.test(pw)) suggestions.push("Add special characters like ! @ # $");

  const strength = score > 80 ? "Strong" : score > 50 ? "Medium" : "Weak";
  return { score, strength, suggestions };
}

export default function PasswordChecker() {
  const [pw, setPw] = useState("");
  const [res, setRes] = useState(null);

  function check() {
    setRes(scorePassword(pw));
  }

  return (
    <div>
      <h2>Password Strength Checker</h2>
      <input
        type="password"
        value={pw}
        onChange={e => setPw(e.target.value)}
        style={{ width: "100%", padding: 8 }}
        placeholder="Type a password..."
      />
      <div style={{ marginTop: 8 }}>
        <button onClick={check}>Check</button>
      </div>
      {res && (
        <div style={{ marginTop: 16, border: "1px solid #ddd", padding: 12 }}>
          <p><strong>Score:</strong> {res.score}</p>
          <p><strong>Strength:</strong> {res.strength}</p>
          {res.suggestions.length > 0 && (
            <>
              <p><strong>Suggestions:</strong></p>
              <ul>{res.suggestions.map((s, i) => <li key={i}>{s}</li>)}</ul>
            </>
          )}
        </div>
      )}
    </div>
  );
}
