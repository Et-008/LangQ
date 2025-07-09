import "./quickFeatures.css";

function QuickFeatures() {
  return (
    <div className="features-preview">
      <div className="feature-card">
        <div className="feature-icon">⚡</div>
        <h3>Instant Setup</h3>
        <p>One command to start</p>
      </div>
      <div className="feature-card">
        <div className="feature-icon">🤖</div>
        <h3>AI Powered</h3>
        <p>Smart translations</p>
      </div>
      <div className="feature-card">
        <div className="feature-icon">🚀</div>
        <h3>Ship Fast</h3>
        <p>Global in minutes</p>
      </div>
    </div>
  );
}

export default QuickFeatures;
