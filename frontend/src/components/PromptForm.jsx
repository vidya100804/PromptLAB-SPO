import { useState } from "react";
import Loader from "./Loader";
import { Sparkles } from "lucide-react";
import "../styles/loader.css";

export default function PromptForm({
  setData,
  loading,
  setLoading,
  setError
}) {
  const [task, setTask] = useState("");
  const [prompt, setPrompt] = useState("");

  const handleOptimize = async () => {
    if (!prompt || !task) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/optimize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ task, prompt })
      });

      if (!res.ok) throw new Error("Optimization failed");

      const data = await res.json();
      setData(data);
    } catch (err) {
      setError(err.message || "Something went wrong");
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
      />

      <label>Initial Prompt</label>
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        disabled={loading}
      />

      {/* BUTTON — UNTOUCHED */}
      <button
        onClick={handleOptimize}
        disabled={loading}
        className="optimize-btn"
      >
        <Sparkles className={`optimize-icon ${loading ? "spinning" : ""}`} />
        <span>{loading ? "Optimizing..." : "Optimize Prompt"}</span>
      </button>

      {/* ✅ LOADER BELOW BUTTON */}
      {loading && (
        <div className="loader-wrapper">
          <Loader />
        </div>
      )}
    </div>
  );
}
