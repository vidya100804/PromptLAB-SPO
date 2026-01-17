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

    try {
      const res = await fetch("/api/optimize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ task, prompt })
      });

      if (!res.ok) {
        throw new Error("Backend error");
      }

      const result = await res.json();
      setData(result);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
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
