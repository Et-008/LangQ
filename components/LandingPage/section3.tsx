import { GithubIcon } from "lucide-react";
import { BookADemoButton, SignUpButton } from "../Buttons";
import { Button } from "../ui/button";

export default function ReadyToShip() {
  return (
    <section className="cta-section">
      <div className="containere">
        <h2 className="cta-title">Ready to Fix Flutter Localization?</h2>
        <p className="cta-subtitle">
          Join millions of Flutter developers who've ditched manual translation
          management for something that actually works.
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
          >
            <Button variant="secondary">pub.dev Package</Button>
          </a>
        </div>
      </div>
    </section>
  );
}
