export default function OutputComparison({ data }) {
  return (
    <div className="card">
      <h2>AI Output Comparison</h2>
      <p className="muted">
        Two prompts generated different outputs. Compare them to see why one is better.
      </p>

      <div className="grid">
        <div className="output">
          <h3>Output A</h3>
          <small>Prompt used:</small>
          <p className="prompt">{data.outputA.prompt}</p>
          <p>{data.outputA.text}</p>
        </div>

        <div className="output better">
          <h3>Output B <span className="tag">Better</span></h3>
          <small>Prompt used:</small>
          <p className="prompt">{data.outputB.prompt}</p>
          <p>{data.outputB.text}</p>
        </div>
      </div>
    </div>
  );
}
