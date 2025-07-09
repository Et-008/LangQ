"use client";

import { useEffect } from "react";
import "./terminal.css";

function Terminal() {
  // Typing animation for terminal
  function typeCommand() {
    const commands = [
      "localize deploy",
      "localize status",
      'localize add "New feature text"',
      "localize sync",
    ];

    let currentCommand = 0;
    const cursor: Element | null = document.querySelector(".typing-cursor");

    function typeText(text: string) {
      if (!cursor) return;

      let i = 0;
      cursor.textContent = "";

      const typing = setInterval(() => {
        if (i < text.length) {
          cursor.textContent = text.substring(0, i + 1) + "_";
          i++;
        } else {
          clearInterval(typing);
          setTimeout(() => {
            cursor.textContent = "_";
            currentCommand = (currentCommand + 1) % commands.length;
            setTimeout(() => typeText(commands[currentCommand]), 1000);
          }, 2000);
        }
      }, 80);
    }

    if (cursor) {
      setTimeout(() => typeText(commands[currentCommand]), 2000);
    }
  }

  useEffect(() => {
    // Initialize animations
    typeCommand();
  }, []);

  return (
    <div className="code-demo">
      <div className="code-header">
        <div className="code-dots">
          <div className="code-dot"></div>
          <div className="code-dot"></div>
          <div className="code-dot"></div>
        </div>
        <span>terminal</span>
      </div>
      <div className="terminal">
        <div className="terminal-line">
          <span className="terminal-prompt">$</span>
          <span className="terminal-command">localize init</span>
        </div>
        <div className="terminal-output">✓ Connected to your project</div>

        <div className="terminal-line">
          <span className="terminal-prompt">$</span>
          <span className="terminal-command">
            localize push "Welcome message"
          </span>
        </div>
        <div className="terminal-output">✓ Added to 24 languages</div>

        <div className="terminal-line">
          <span className="terminal-prompt">$</span>
          <span className="terminal-command">localize pull</span>
        </div>
        <div className="terminal-output terminal-success">
          ✓ Downloaded 247 translations
        </div>
        <div className="terminal-output terminal-success">
          ✓ Ready to ship globally
        </div>

        <div className="terminal-line">
          <span className="terminal-prompt">$</span>
          <span className="typing-cursor">_</span>
        </div>
      </div>
    </div>
  );
}

export default Terminal;
