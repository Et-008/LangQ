import { BookADemoButton } from "@/components/Buttons";
import Hero from "@/components/hero";
import LandingPage from "@/components/LandingPage";
import LangqProvider from "@/components/LangqProvider/provider";
import LocationPage from "@/components/Location";
import QuickFeatures from "@/components/QuickFeatures";
import Terminal from "@/components/Terminal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import WhyWeStarted from "@/components/WhyWeStarted";
import { FormattedMessage } from "react-intl";

export default async function Home() {
  return (
    <>
      <Hero />
      <LandingPage />
      <div className="hidden">
        <LocationPage />
      </div>
      {/* <QuickFeatures />
      <WhyWeStarted />
      <div className="flex content-center flex-col max-w-[350px] m-auto gap-10 border p-10 rounded-lg text-center">
        Why don't you give us a try?
        <br />
        <BookADemoButton />
      </div> */}
      {/* <Terminal /> */}
      {/* <LangqProvider
        locale="en"
        projectToken="eba4c5fb6b64467c.39539e5a3a329ce5c0ee03b50cbb0958b96dc1741f47356c0c9fafcccfa6a7e6"
      >
        <main className="flex-1 flex flex-col gap-20 px-4 text-center">
          <div className="flex justify-between">
            <div className="max-w-1/2">
              <h2 className="font-medium text-[38px] mb-4">
                <FormattedMessage id="home.page.section.header.whyChooseUs" />
              </h2>
              <FormattedMessage id="home.page.section.description.whyChooseUs" />
            </div>
          </div>
          <div className="flex justify-between">
            <div className="max-w-1/2 ml-auto">
              <h2 className="font-medium text-[38px] mb-4">
                <FormattedMessage id="home.page.section.header.accuracyLike.neverBefore" />
              </h2>
              <FormattedMessage id="home.page.section.description.accuracyLike.neverBefore" />
            </div>
          </div>

          <div className="flex justify-between">
            <div className="max-w-1/2">
              <h2 className="font-medium text-[38px] mb-4">
                <FormattedMessage id="home.page.section.header.accuracyLike.neverBefore" />
              </h2>
              <p>
                <FormattedMessage id="home.page.section.description.accuracyLike.neverBefore" />
              </p>
            </div>
          </div>

          <div className="flex justify-between">
            <div className="max-w-1/2 ml-auto">
              <h2 className="font-medium text-[38px] mb-4">
                <FormattedMessage id="home.page.section.header.global.expansion" />
              </h2>
              <p>
                <FormattedMessage id="home.page.section.description.global.expansion" />
              </p>
            </div>
          </div>
        </main>
      </LangqProvider> */}
    </>
  );
}
