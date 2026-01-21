import { useState } from "react";
import Hero from "./components/Hero";
import PromptForm from "./components/PromptForm";
import OutputComparison from "./components/OutputComparison";
import FinalPrompt from "./components/FinalPrompt";
import "./App.css";
import "./styles/loader.css";

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  return (
    <div className="container">
      <Hero />

      <PromptForm
        setData={setData}
        loading={loading}
        setLoading={setLoading}
        setError={setError}
      />

      {error && <p className="error-text">{error}</p>}

      {data && !loading && (
        <>
          <OutputComparison data={data} />
          <FinalPrompt data={data} />
        </>
      )}
    </div>
  );
}

export default App;
