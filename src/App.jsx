import React from "react";
import { Outlet, Link } from "react-router-dom";

export default function App() {
  return (
    <div style={{ fontFamily: "system-ui, Arial", padding: 24 }}>
      <header style={{ display: "flex", gap: 12, marginBottom: 24 }}>
        <h1>Cyber Awareness</h1>
        <nav style={{ marginLeft: 20 }}>
          <Link to="/">Email Analyzer</Link> |{" "}
          <Link to="/password">Password Checker</Link> |{" "}
          <Link to="/game">Phishing Game</Link> |{" "}
          <Link to="/quiz">Quiz</Link>
        </nav>
      </header>

      <main style={{ maxWidth: 1000 }}>
        <Outlet />
      </main>

      <footer style={{ marginTop: 40, color: "#666" }}>
        Built with ❤️
      </footer>
    </div>
  );
}
