import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import App from "./App";
import EmailAnalyzer from "./pages/EmailAnalyzer";
import PasswordChecker from "./pages/PasswordChecker";
import PhishingGame from "./pages/PhishingGame";
import Quiz from "./pages/Quiz";
import "./styles.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<EmailAnalyzer />} />
          <Route path="password" element={<PasswordChecker />} />
          <Route path="game" element={<PhishingGame />} />
          <Route path="quiz" element={<Quiz />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
