import NextLogo from "./next-logo";
import SupabaseLogo from "./supabase-logo";
import { Button, ElectricButton, ShimmerButton } from "./ui/button";

export function redirectWithAnchor(url: string, newTab: boolean = false) {
  const a = document.createElement("a");
  a.href = url;
  a.style.display = "none"; // optional, hide it
  if (newTab) {
    a.target = "_blank";
    a.rel = "noopener noreferrer"; // security best practice
  }
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

export default function Header() {
  function openCalendlyInNewTab() {
    const url = "https://calendly.com/team-lang-q/30min";
    window.open(url, "_blank");
  }

  function redirectToSignupPage() {
    const url = `${process.env.NEXT_PUBLIC_APP_DOMAIN}/sign-up`;
    redirectWithAnchor(url, true);
  }

  return (
    <div className="flex flex-col gap-16 items-center justify-center min-h-[750px]">
      <h1 className="sr-only">LangQ - translator for your business</h1>
      <div className="hero-header text-4xl lg:text-5xl !leading-tight mx-auto max-w-3xl text-center">
        Translate{" "}
        <a
          href="/"
          target="_blank"
          className="font-bold hover:underline blink-light"
          rel="noreferrer"
        >
          Lightning-Fast
        </a>{" "}
        &{" "}
        <a
          href="/"
          target="_blank"
          className="font-bold hover:underline blink-light-2"
          rel="noreferrer"
        >
          Accurate.
        </a>{" "}
        Unlock Global Reach.
      </div>
      <div className="flex flex-col gap-8 justify-center items-center max-w-2xl text-center">
        <p>Welcome to LanQ, the next generation of localization.</p>
      </div>
      <div className="flex gap-5">
        <Button variant="default" onClick={openCalendlyInNewTab}>
          Book a Demo
        </Button>
        <ShimmerButton onClick={redirectToSignupPage}>
          Get started for free
        </ShimmerButton>
      </div>
      {/* <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent my-8" /> */}
    </div>
  );
}
