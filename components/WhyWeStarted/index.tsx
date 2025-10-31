import "./whyWeStarted.css";

function WhyWeStarted() {
  return (
    <section className="why-section animate-on-scroll" id="why">
      <div className="container">
        <h2>Why We Built This</h2>
        <div className="why-content">
          <p>
            We founded{" "}
            <span className="font-semibold">[Lang Q](https://lang-q.com)</span>{" "}
            with a simple yet powerful mission: to bridge linguistic divides and
            foster understanding across cultures.
          </p>
          <br />
          {/* <p>
            As developers, we were tired of{" "}
            <span className="highlight">complex localization platforms</span>{" "}
            that took days to set up and weeks to master. We needed something
            that worked like our favorite developer tools:{" "}
            <span className="highlight">simple, fast, and powerful</span>.
          </p>
          <br /> */}
          <p>
            So we built Localize. One tool that does exactly what you need:
            <span className="highlight">
              manage strings, translate instantly, and deploy globally
            </span>
            . No learning curve. No feature bloat. Just localization that works.
          </p>
        </div>
      </div>
    </section>
  );
}

export default WhyWeStarted;
