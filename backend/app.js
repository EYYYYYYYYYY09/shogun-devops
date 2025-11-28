import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import analyzeRoute from "./routes/analyze.js";
import ruleRoute from "./routes/ruleAnalyze.js";
import quizRoute from "./routes/quiz.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// routes
app.use("/api/analyze-email", analyzeRoute);
app.use("/api/rule-analyze", ruleRoute);
app.use("/api/quiz", quizRoute);

app.get("/", (req, res) => res.send("Cyber Awareness Backend Running"));

app.listen(PORT, () => console.log(`Backend listening on http://localhost:${PORT}`));
