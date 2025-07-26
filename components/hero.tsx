import { SignUpButton, BookADemoButton } from "./Buttons";

export default function Header() {
  return (
    <div>
      <div className="flex flex-col gap-16 items-center justify-center min-h-[670px]">
        <h1 className="sr-only">Lang Q - translator for your business</h1>
        <div>
          <div className="flex items-center w-full justify-center">
            <div className="hero-badge">
              <div className="ai-indicator">Q</div>
              <span>Built by Developers, For Developers</span>
            </div>
          </div>
          <div className="hero-header text-5xl lg:text-6xl !leading-tight mx-auto max-w-3xl text-center">
            {/* <a
              href="/"
              target="_blank"
              className="font-bold hover:underline blink-light"
              rel="noreferrer"
            >
              Lightning-Fast
            </a>{" "}
            &{" "} */}
            <strong className="font-bold blink-light-2" rel="noreferrer">
              Translate Accurately.
            </strong>{" "}
            <br />
            <p className="p-3"></p>
            <strong className="font-bold blink-light" rel="noreferrer">
              Localize Effortlessly.
            </strong>
            {/* Unlock Global Reach. */}
          </div>
        </div>
        <div className="flex flex-col gap-1 justify-center items-center max-w-2xl text-center text-lg font-bold">
          {/* <p>Welcome to Lang Q.</p> */}
          <p>One tool. Zero hassle.</p>
        </div>
        <div className="flex gap-5">
          <BookADemoButton />

          <SignUpButton />
        </div>
      </div>
      <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent my-8" />
    </div>
  );
}
