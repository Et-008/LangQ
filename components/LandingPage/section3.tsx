import { GithubIcon } from "lucide-react";
import { BookADemoButton, SignUpButton } from "../Buttons";
import { Button } from "../ui/button";

export default function ReadyToShip() {
  return (
    <div>
      <section className="cta-section">
        <div className="containere">
          <h2 className="cta-title">Ready to Fix Flutter Localization?</h2>
          <p className="cta-subtitle">
            Streamline your Flutter localization with a solution designed to replace manual translation management.
          </p>
          <div className="cta-buttons">
            {/* <SignUpButton /> */}
            <BookADemoButton />
            {/* <a
            href="https://github.com/ib8-dev/langq_flutter?tab=readme-ov-file#lang-q-localization"
            className="btn btn-secondary btn-large"
            target="_blank"
          >
            <Button variant="secondary">View Documentation</Button>
          </a> */}
            <a
              href="https://pub.dev/packages/langq_localization"
              className="btn btn-outline btn-large"
              target="_blank"
            >
              <Button variant="secondary">pub.dev</Button>
            </a>
          </div>
        </div>
      </section>
      <div className="h-px w-full bg-gradient-to-r from-transparent via-[#D2D8E183] to-transparent dark:via-[#959CB183]"></div>
    </div>
  );
}
