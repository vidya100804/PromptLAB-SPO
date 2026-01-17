import TextType from "./TextType";
import { Sparkles } from "lucide-react";
import "../styles/hero.css";

export default function Hero() {
  return (
    <div className="hero">
      <span className="badge badge-with-icon">
  <Sparkles className="sparkle-icon" />
  <span className="badge-text">Self-Supervised Learning</span>
</span>
      <h1>
  Self-Supervised{" "}
  <span className="animated-text glow-text">
    Prompt Optimization
  </span>
</h1>



      <TextType
        as="p"
        text="Improve your prompts automatically by comparing AI outputs. No ground truth. No manual tuning. Just better prompts."
        cursorCharacter="●"
        className="hero-typing-text"
        style={{color:"111827"}}
      />
    </div>
  );
}
