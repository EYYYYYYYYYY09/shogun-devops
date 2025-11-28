import express from "express";

function extractUrls(text) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.match(urlRegex) || [];
}

export function ruleAnalyze(emailText) {
  const lower = emailText.toLowerCase();
  const urls = extractUrls(emailText);
  const redFlags = [];

  const urgentWords = ["urgent", "immediately", "asap", "act now", "verify", "verify your account", "password", "login"];
  urgentWords.forEach(w => { if (lower.includes(w)) redFlags.push(`Contains urgent phrase: "${w}"`); });

  // suspicious domains heuristics
  urls.forEach(url => {
    if (url.includes(".zip") || url.includes(".exe") || url.includes("tinyurl") || /xn--/.test(url)) {
      redFlags.push(`Suspicious URL pattern: ${url}`);
    }
    // if URL visible text mismatch could be detected on frontend later
  });

  // common phishing phrases
  const suspiciousPhrases = ["click the link", "update your information", "confirm your account", "suspended", "payment failed"];
  suspiciousPhrases.forEach(p => { if (lower.includes(p)) redFlags.push(`Suspicious phrase: "${p}"`); });

  // excessive exclamation marks or all caps
  if ((emailText.match(/!/g) || []).length > 3) redFlags.push("Excessive exclamation marks");
  if (emailText === emailText.toUpperCase() && emailText.length > 50) redFlags.push("Message in ALL CAPS");

  // simple risk scoring
  const score = Math.min(100, Math.round((redFlags.length / 6) * 100));

  const classification = score > 60 ? "High risk" : (score > 30 ? "Suspicious" : "Likely Legitimate");

  return {
    risk_score: score,
    classification,
    red_flags: redFlags,
    urls
  };
}

const router = express.Router();
router.post("/", (req, res) => {
  const { emailText } = req.body || {};
  if (!emailText) return res.status(400).json({ error: "emailText required" });
  return res.json(ruleAnalyze(emailText));
});

export default router;

