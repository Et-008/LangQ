import Hero from "@/components/hero";
import ConnectSupabaseSteps from "@/components/tutorial/connect-supabase-steps";
import SignUpUserSteps from "@/components/tutorial/sign-up-user-steps";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";

export default async function Home() {
  return (
    <>
      <Hero />
      <main className="flex-1 flex flex-col gap-6 px-4">
        <h2 className="font-medium text-xl mb-4">Why Choose Us?</h2>
        <p>
          Speed You Can Count On Using cutting-edge large language models
          (LLMs), we deliver translations faster than ever before. Say goodbye
          to long wait times and hello to instant, reliable results that keep
          your projects moving forward.
        </p>

        <h2 className="font-medium text-xl mb-4">Accuracy Like Never Before</h2>
        <p>
          Our LLM-powered translations are not only quick but incredibly
          precise. Whether you’re localizing product descriptions, websites, or
          customer support, we ensure your message resonates perfectly in every
          language.
        </p>

        <h2 className="font-medium text-xl mb-4">Affordable & Scalable</h2>
        <p>
          We know that every business has unique needs. That’s why we offer a
          cost-effective solution that scales with your company’s growth,
          ensuring you get the most value out of every translation.
        </p>

        <h2 className="font-medium text-xl mb-4">
          How LLMs Revolutionize the Translation Process
        </h2>
        <p>
          We know that every business has unique needs. That’s why we offer a
          cost-effective solution that scales with your company’s growth,
          ensuring you get the most value out of every translation.
        </p>

        <p>
          Our LLM technology is trained on vast amounts of multilingual data,
          allowing us to provide translations that go beyond simple
          word-for-word accuracy. We understand the subtleties of each language,
          so you can trust that every piece of content is optimized for its
          target audience.
        </p>

        <h2 className="font-medium text-xl mb-4">Global Expansion Made Easy</h2>
        <p>
          Expand your business across borders with confidence. Whether you're
          launching in a new market or updating content in multiple languages,
          our platform streamlines the localization process and makes it simple.
        </p>

        <h2 className="font-medium text-xl mb-4">
          Trusted by Leading Companies Worldwide
        </h2>
        <p>
          Join a growing list of companies who trust [Your Company Name] to
          break language barriers and accelerate their global growth.
        </p>

        <p>
          Ready to take your business worldwide? Start localizing with us today!
        </p>
        {/* {hasEnvVars ? <SignUpUserSteps /> : <ConnectSupabaseSteps />} */}
      </main>
    </>
  );
}
