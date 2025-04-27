import NextLogo from "./next-logo";
import SupabaseLogo from "./supabase-logo";

export default function Header() {
  return (
    <div className="flex flex-col gap-16 items-center justify-center min-h-screen">
      <h1 className="sr-only">LangQ - translator for your business</h1>
      <p className="text-3xl lg:text-4xl !leading-tight mx-auto max-w-xl text-center">
        Translate{" "}
        <a
          href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
          target="_blank"
          className="font-bold hover:underline"
          rel="noreferrer"
        >
          Lightning-Fast
        </a>{" "}
        &{" "}
        <a
          href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
          target="_blank"
          className="font-bold hover:underline"
          rel="noreferrer"
        >
          Accurate.
        </a>{" "}
        Unlock Global Reach.
      </p>
      <div className="flex flex-col gap-8 justify-center items-center max-w-2xl text-center">
        {/* <p>Welcome to LanQ, the next generation of localization software.</p> */}
        <p>
          At{" "}
          <a href="/" className="font-bold hover:underline">
            LangQ
          </a>{" "}
          we empower companies to seamlessly connect with customers worldwide by
          providing high-speed, highly accurate translations in any language.
        </p>
      </div>
      <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent my-8" />
    </div>
  );
}
