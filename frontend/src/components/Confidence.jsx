import '../styles/confidence.css';


export default function Confidence({ score }) {
  return (
    <div className="card">
      <h2>Optimization Confidence</h2>

      <div className="confidence-bar">
        <div
          className="confidence-fill"
          style={{ width: `${score}%` }}
        />
      </div>

      <p className="confidence-text">
        {score}% confidence that the optimized prompt performs better.
      </p>
    </div>
  );
}
