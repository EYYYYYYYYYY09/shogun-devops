import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  timeout: 20000
});

// analyze with AI+rule
export const analyzeEmail = (emailText) => api.post("/analyze-email", { emailText }).then(r => r.data);

// rule-only analyze
export const ruleAnalyze = (emailText) => api.post("/rule-analyze", { emailText }).then(r => r.data);

// quiz fetch
export const fetchQuiz = () => api.get("/quiz").then(r => r.data);
