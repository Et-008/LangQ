export default function ReadyToShip() {
  return (
    <section className="cta-section">
      <div className="containere">
        <h2 className="section-title">What Makes Us Different!</h2>
        <p className="cta-subtitle">
          Localization that just works! Built specifically for <br />
          <strong className="blink-light">Flutter</strong> developers.
        </p>

        <div className="solutions-grid">
          <div className="solution-card">
            <div className="solution-icon">⚡</div>
            <h3>Zero Manual Work</h3>
            <p>
              One command pulls everything. No downloading ZIP files, no manual
              copying.
            </p>
            <div className="solution-example">
              <div className="code-line">
                <span className="terminal-prompt">$</span>{" "}
                <span className="terminal-command">
                  dart run langq_localization:pull
                </span>
              </div>
              <div className="code-line terminal-output">
                ✓ Generated type-safe Dart code
              </div>
              <div className="code-line terminal-output">
                ✓ Updated 25 language files
              </div>
              <div className="code-line">
                <span className="highlight-success">Ready to build! 🚀</span>
              </div>
            </div>
          </div>

          <div className="solution-card">
            <div className="solution-icon">🤖</div>
            <h3>"Contextful" AI Translations</h3>
            <p>
              Context-aware translations that understand your app structure and
              variables.
            </p>
            <div className="solution-example">
              <div className="code-line">
                <span className="comment">
                  // AI understands your App context
                </span>
              </div>
              <div className="code-line">
                <span className="property">Input:</span>{" "}
                <span className="string">{`Welcome {userName}!`}</span>
              </div>
              <div className="code-line">
                <span className="property">Context:</span>{" "}
                <span className="string">"MaterialApp greeting"</span>
              </div>
              <div className="code-line">
                <span className="highlight-success">
                  {`🇪🇸 ¡Bienvenido {userName}!`}
                </span>
              </div>
            </div>
          </div>

          <div className="solution-card">
            <div className="solution-icon">🎯</div>
            <h3>Smart Plurals</h3>
            <p>
              Handles impossible cases like "3 cats (each with 2 lives)" that
              break other tools.
            </p>
            <div className="solution-example">
              <div className="code-line">
                <span className="comment">
                  // Nested plurals that just work
                </span>
              </div>
              <div className="code-line">
                <span className="string">
                  {`{users} users liked {posts} posts`}
                </span>
              </div>
              <div className="code-line">
                <span className="highlight-success">
                  ✓ Handles all languages automatically
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
