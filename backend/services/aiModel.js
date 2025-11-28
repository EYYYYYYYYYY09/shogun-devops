import OpenAI from "openai";
import dotenv from "dotenv";
import { ruleAnalyze } from "../routes/ruleAnalyze.js";
dotenv.config();

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function analyzeWithAI(emailText) {
  // prompt: ask model to return parseable JSON
  const prompt = `
You are an expert cybersecurity analyst. Analyze the following email for phishing/scam/fraud.
Return valid JSON only (no extra commentary) with fields:
- risk_score: integer 0-100
- classification: one of "Legitimate", "Suspicious", "High-risk phishing", "Malicious"
- red_flags: array of short strings explaining issues
- summary: one-sentence summary
- suggested_actions: array of suggestions for a user

Email:
"""${emailText}"""
`;

  const resp = await client.chat.completions.create({
    model: process.env.OPENAI_MODEL || "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    max_tokens: 600,
    temperature: 0
  });

  const raw = resp.choices?.[0]?.message?.content || "";
  // attempt to locate JSON in the response (be defensive)
  let parsed;
  try {
    // sometimes the model wraps JSON in triple backticks — strip characters until the first { and last }
    const first = raw.indexOf("{");
    const last = raw.lastIndexOf("}");
    if (first !== -1 && last !== -1) {
      const jsonStr = raw.substring(first, last + 1);
      parsed = JSON.parse(jsonStr);
    } else {
      parsed = JSON.parse(raw);
    }
  } catch (err) {
    // fallback: return rule-based analysis
    const rule = ruleAnalyze(emailText);
    return {
      error: "AI-parsing-failed",
      raw,
      rule
    };
  }

  return parsed;
}
