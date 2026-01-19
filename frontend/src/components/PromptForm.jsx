import { useState } from "react";
//import ContentCopyIcon from "@mui/icons-material/ContentCopy";
//import { IconButton, Tooltip } from "@mui/material";

import { Sparkles } from "lucide-react";

export default function PromptForm({
  setData,
  loading,
  setLoading,
  setError
}) {
  const [task, setTask] = useState("");
  const [prompt, setPrompt] = useState("");

  const handleOptimize = async () => {
    if (!task || !prompt) {
      setError("Please enter both task and initial prompt.");
      return;
    }

    setLoading(true);
    setError(null);
    setData(null);

    // ✅ UNIVERSAL MOCK (works in local + Vercel)
    setTimeout(() => {
      setData({
        outputA: {
          prompt,
          text: `This response was generated using the original prompt without additional guidance for the task: "${task}".`
        },
        outputB: {
          prompt: `${task}

Instructions:
- Be clear and structured
- Use simple language
- Include examples if helpful`,
          text: `This response was generated using a more structured prompt tailored to the same task.`
        },
        finalPrompt: `${task}

Write a clear, well-structured, and beginner-friendly response.
Avoid unnecessary technical jargon.
Use examples where appropriate.`,
        reason:
          "The optimized prompt improves clarity and structure, helping generate more relevant and useful responses."
      });
      setLoading(false);
    }, 800);
  };



  return (
    <div className="card">
      <h2>Enter Your Prompt</h2>

      <label>Task Description</label>
      <textarea
        value={task}
        onChange={(e) => setTask(e.target.value)}
        disabled={loading}
        placeholder="Describe the goal you want the AI to achieve"
      />

      <label>Initial Prompt</label>
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        disabled={loading}
        placeholder="Enter your raw or imperfect prompt"
      />

      <button
  onClick={handleOptimize}
  disabled={loading}
  className="optimize-btn"
>
  <Sparkles className={`optimize-icon ${loading ? "spinning" : ""}`} />
  <span>{loading ? "Optimizing…" : "Optimize Prompt"}</span>
</button>

    </div>
  );
}