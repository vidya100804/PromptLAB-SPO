
import { useState } from "react";
import { Copy } from "lucide-react";
import Confidence from "./Confidence";

export default function FinalPrompt({ data }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(data.finalPrompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      alert("Failed to copy");
    }
  };

  return (
    <div className="card">
      <h2>Final Optimized Prompt</h2>

      <div className="grid">
        {/* Original Prompt */}
        <div className="output">
          <h4>Your Original Prompt</h4>
          <p className="prompt">{data.outputA.prompt}</p>
        </div>

        {/* Optimized Prompt */}
        <div className="output better">
          <div className="copy-header">
            <h4>Optimized Prompt</h4>
            <button
              onClick={handleCopy}
              className="copy-btn"
              aria-label="Copy optimized prompt"
              title={copied ? "Copied!" : "Copy"}
            >
              <Copy size={16} />
            </button>
          </div>

          <p className="prompt">{data.finalPrompt}</p>

          <Confidence score={data.confidenceScore} />

          <div className="reason">
            <strong>Why this is better</strong>
            <p>{data.reason}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
