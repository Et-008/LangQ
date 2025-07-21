export default function HowitWorks() {
  return (
    <section className="how-it-works  relative" id="how-it-works">
      <div className="containere">
        <h2 className="section-title">How It Works</h2>
        <p className="section-subtitle">
          Three simple steps to global reach. No PhD required.
        </p>

        <div className="steps-container">
          <div className="step">
            <div className="step-number">1</div>
            <div className="step-content">
              <h3 className="step-title">Add Your Strings</h3>
              <p className="step-description">
                Write your text once in our clean, developer-friendly portal.
                Add context hints for better AI translations.
              </p>
              <div className="step-demo">
                <div className="feature-example">
                  <div className="code-line">
                    <span className="comment">
                      // Portal: Add new translation key
                    </span>
                  </div>
                  <div className="code-line">
                    <span className="property">Key:</span>{" "}
                    <span className="string">welcome_message</span>
                  </div>
                  <div className="code-line">
                    <span className="property">Text:</span>{" "}
                    <span className="string">
                      "Hi {"userName"}, you have {"count"} messages"
                    </span>
                  </div>
                  <div className="code-line">
                    <span className="property">Context:</span>{" "}
                    <span className="string">
                      "Friendly greeting, casual tone"
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="step">
            <div className="step-number">2</div>
            <div className="step-content">
              <h3 className="step-title">AI Translates Instantly</h3>
              <p className="step-description">
                Our AI understands context and generates high-quality
                translations for all your target languages in seconds.
              </p>
              <div className="step-demo">
                <div className="feature-example">
                  <div className="code-line">
                    <span className="ai-highlight">🤖 AI Processing...</span>
                  </div>
                  <div className="code-line">
                    <span className="ai-highlight">
                      🇪🇸 "¡Hola {"userName"}! Tienes {"count"}
                      mensajes"
                    </span>
                  </div>
                  <div className="code-line">
                    <span className="ai-highlight">
                      🇫🇷 "Salut {"userName"}! Tu as {"count"}
                      messages"
                    </span>
                  </div>
                  <div className="code-line">
                    <span className="ai-highlight">
                      🇩🇪 "Hallo {"userName"}! Du hast {"count"}
                      Nachrichten"
                    </span>
                  </div>
                  <div className="code-line">
                    <span className="comment">
                      // + 20 more languages instantly
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="step">
            <div className="step-number">3</div>
            <div className="step-content">
              <h3 className="step-title">Pull & Ship</h3>
              <p className="step-description">
                One command pulls everything and generates type-safe code. Your
                IDE auto-completes, your app ships globally.
              </p>
              <div className="step-demo">
                <div className="feature-example">
                  <div className="code-line">
                    <span className="terminal-prompt">$</span>{" "}
                    <span className="terminal-command">
                      dart run langq_localization:pull
                    </span>
                  </div>
                  <div className="code-line terminal-output">
                    ✓ Generated type-safe keys
                  </div>
                  <div className="code-line terminal-output">
                    ✓ Updated 25 language files
                  </div>
                  <div style={{ marginTop: "1rem" }}></div>
                  <div className="code-line">
                    <span className="comment">Use in your app:</span>
                  </div>
                  <div className="code-line">
                    <span className="function">Text</span>(
                    <span className="function">LangQKey</span>.
                    <span className="property">welcomeMessage</span>(
                  </div>
                  <div className="code-line">
                    <span style={{ marginLeft: "1rem" }}>
                      <span className="property">userName:</span>{" "}
                      <span className="string">'Sarah'</span>,
                    </span>
                  </div>
                  <div className="code-line">
                    <span style={{ marginLeft: "1rem" }}>
                      <span className="property">count:</span>{" "}
                      <span className="string">5</span>
                    </span>
                  </div>
                  <div className="code-line">));</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
