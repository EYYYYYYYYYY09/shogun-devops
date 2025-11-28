import React, { useState } from "react";
import { analyzeEmail, ruleAnalyze } from "../utils/api";

export default function EmailAnalyzer() {
  const [emailText, setEmailText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  async function onAnalyze(useRuleOnly = false) {
    setLoading(true);
    setResult(null);
    try {
      const data = useRuleOnly ? await ruleAnalyze(emailText) : await analyzeEmail(emailText);
      setResult(data);
    } catch (err) {
      setResult({ error: err.message });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h2>Email Analyzer</h2>
      <textarea
        placeholder="Paste the full email (headers optional) here..."
        rows={10}
        style={{ width: "100%", fontFamily: "monospace" }}
        value={emailText}
        onChange={(e) => setEmailText(e.target.value)}
      />
      <div style={{ marginTop: 8 }}>
        <button onClick={() => onAnalyze(false)} disabled={loading || !emailText}>Analyze (AI + Rule)</button>{" "}
        <button onClick={() => onAnalyze(true)} disabled={loading || !emailText}>Quick Rule Analyze</button>
      </div>

      <div style={{ marginTop: 20 }}>
        {loading && <div>Analyzing…</div>}
        {result && (
          <div style={{ border: "1px solid #ddd", padding: 12 }}>
            <pre style={{ whiteSpace: "pre-wrap" }}>{JSON.stringify(result, null, 2)}</pre>
            {/* friendly rendering when AI result present */}
            {result.ai && (
              <>
                <h3>AI Result</h3>
                <p><strong>Risk:</strong> {result.ai.risk_score}</p>
                <p><strong>Classification:</strong> {result.ai.classification}</p>
                <p><strong>Red flags:</strong></p>
                <ul>{(result.ai.red_flags || []).map((r, i) => <li key={i}>{r}</li>)}</ul>
              </>
            )}
            {result.rule && (
              <>
                <h3>Rule Result</h3>
                <p><strong>Risk:</strong> {result.rule.risk_score}</p>
                <p><strong>Classification:</strong> {result.rule.classification}</p>
                <ul>{(result.rule.red_flags || []).map((r, i) => <li key={i}>{r}</li>)}</ul>
              </>
            )}
            {!result.ai && !result.rule && result.red_flags && (
              <>
                <h3>Rule Result</h3>
                <p><strong>Risk:</strong> {result.risk_score}</p>
                <p><strong>Classification:</strong> {result.classification}</p>
                <ul>{(result.red_flags || []).map((r, i) => <li key={i}>{r}</li>)}</ul>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
