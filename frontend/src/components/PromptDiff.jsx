import DiffMatchPatch from "diff-match-patch";

export default function PromptDiff({ before, after }) {
  if (!before || !after || before.trim() === after.trim()) {
    return null;
  }

  // 🔑 Word-level tokenization
  const tokenize = (text) =>
    text
      .trim()
      .split(/\s+/)
      .map(word => `${word} `)
      .join("");

  const beforeText = tokenize(before);
  const afterText = tokenize(after);

  const dmp = new DiffMatchPatch();
  const diffs = dmp.diff_main(beforeText, afterText);
  dmp.diff_cleanupSemantic(diffs);

  return (
    <div className="card">
      <h2>Prompt Changes</h2>
      <p className="muted">
        Highlighted differences show how the prompt evolved.
      </p>

      <div className="diff-box">
        {diffs.map(([type, text], index) => {
  let className = "diff-same";
  if (type === 1) className = "diff-added";
  if (type === -1) className = "diff-removed";

  const needsGap =
    type === 1 && index > 0 && diffs[index - 1][0] === -1;

  return (
    <span key={index} className={className}>
      {needsGap && "\n"}
      {text}
    </span>
  );
})}

      </div>
    </div>
  );
}
