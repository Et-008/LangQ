import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import { EnvVarWarning } from "./env-var-warning";
import Link from "next/link";
import Header from "./Header";

export default function Navigation() {
  return (
    <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
      <div className="w-full max-w-6xl flex items-center p-3 px-5 text-sm">
        <div className="flex gap-5 items-center font-semibold text-lg mr-10">
          <h1>
            <Link href={"/"}>LangQ</Link>
          </h1>
        </div>
        {!hasEnvVars ? <EnvVarWarning /> : <Header />}
      </div>
    </nav>
  );
}
