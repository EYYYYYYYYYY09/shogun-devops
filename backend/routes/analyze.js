import express from "express";
import { analyzeWithAI } from "../services/aiModel.js";
import { ruleAnalyze } from "./ruleAnalyze.js";

const router = express.Router();

// POST { emailText: "..." }
router.post("/", async (req, res) => {
  const { emailText } = req.body || {};
  if (!emailText) return res.status(400).json({ error: "emailText required" });

  // Run rule-based quick analysis first
  const ruleResult = ruleAnalyze(emailText);

  // If OPENAI key exists, call AI model for richer analysis. If not, return rule result.
  try {
    const aiKey = process.env.OPENAI_API_KEY;
    if (!aiKey) {
      return res.json({ source: "rule", ...ruleResult });
    }
    const aiResult = await analyzeWithAI(emailText);
    // merge outputs: aiResult is primary but include rule flags
    return res.json({ source: "ai", ai: aiResult, rule: ruleResult });
  } catch (err) {
    console.error("AI analysis error:", err?.message || err);
    return res.status(500).json({ error: "AI analysis failed", details: err?.message, rule: ruleResult });
  }
});

export default router;
