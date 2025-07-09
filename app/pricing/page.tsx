import { Button, ShimmerButton } from "@/components/ui/button";

import { Metadata } from "next";
import FallingText from "./fallingText";
import { SignUpButton } from "../../components/Buttons";

export const metadata: Metadata = {
  title: "Lang Q | Pricing page",
  description:
    "LangQ is a professional translation service started to provide fast, accurate, and culturally-aware translations tailored for businesses looking to scale globally with confidence.",
  // other metadata
};

function PricingPage() {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-6xl mx-auto p-6 absolute ">
        <div className="flex flex-col gap-20">
          <div
            key={"Starter"}
            className="flex flex-col rounded-2xl p-6 shadow-lg border transition-all border-primary scale-105 justify-center z-30"
          >
            <div className="mb-2 text-sm font-semibold uppercase tracking-wide text-yellow-300">
              Free for everyone
            </div>
            <h3 className="text-2xl font-bold mb-2">Starter</h3>
            <p className="text-3xl font-semibold mb-4">$0/mo</p>
            <ul className="space-y-2 mb-6">
              {[
                "1000 translations",
                "30 Languages",
                "10 Projects",
                "Instant translation",
              ].map((feature, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="text-green-500">✔</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <SignUpButton />
            <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-3">
              * No credit card required
            </p>
          </div>

          <div className="flex flex-col gap-2 text-center">
            Want to know more?
            <Button>Request a Call back</Button>
          </div>
        </div>
      </div>
      <FallingText
        // text="We want to show big user growth to investors or the public."
        text="We offer everything free, we’ll figure out monetization later."
        // revealText="The best marketing is a product people can use immediately."
        revealText="We give a reasonable free plan, contact us for a custom one!"
        highlightWords={[
          "everything",
          "free",
          "growth",
          "accessible",
          "all",
          "contact",
          "us",
        ]}
        //   highlightClass="highlighted"
        trigger="auto"
        backgroundColor="transparent"
        wireframes={false}
        gravity={0.56}
        fontSize="2rem"
        mouseConstraintStiffness={0.9}
      />
    </>
  );
}

export default PricingPage;
