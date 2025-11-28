import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import EmailAnalyzer from './pages/EmailAnalyzer';
import PasswordChecker from './pages/PasswordChecker';
import PhishingGame from './pages/PhishingGame';
import Quiz from './pages/Quiz';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
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
