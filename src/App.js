import React from 'react';
import { Link, Outlet } from 'react-router-dom';

function App() {
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
        Build by Shogun for DevOps first project
      </footer>mkdir -p .github/workflows

    </div>
  );
}

export default App;
