import { Button, ShimmerButton } from "@/components/ui/button";
import AboutSectionOne from "@/components/About/AboutSectionOne";
import AboutSectionTwo from "@/components/About/AboutSectionTwo";
import Breadcrumb from "@/components/Common/Breadcrumb";
import WhyWeStarted from "@/components/WhyWeStarted";

import { Metadata } from "next";
import { PhoneCallIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import "./about.css";
import { RequestACallBack } from "@/components/Buttons";

export const metadata: Metadata = {
  title: "Lang Q | Who are we and what we do...",
  description:
    "LangQ is a professional translation service started to provide fast, accurate, and culturally-aware translations tailored for businesses looking to scale globally with confidence.",
  // other metadata
};

const AboutPage = () => {
  return (
    <>
      <h1 className="fx actr m-auto text-2xl">About Us</h1>
      <OurStory />
      <GetStartedWithUs />
      <WhyWeStarted />
    </>
  );
};

function OurStory() {
  return (
    <section className="animate-on-scroll" id="why">
      <div className="container">
        <div className="content">
          <p className=" mb-4">
            At <span className="font-semibold">Lang Q</span>, we believe that{" "}
            <strong className="">language should never be a barrier</strong>. In
            an increasingly interconnected world, clear and accurate
            communication is essential for individuals and businesses alike.
          </p>
          <p className="">
            Our journey began when we realized the growing need for
            high-quality, specialized translations. Since then, we've grown into
            a trusted partner for clients worldwide, delivering precision and
            cultural nuance in every project.
          </p>
        </div>
      </div>
    </section>
  );
}

function GetStartedWithUs() {
  return (
    <div className="text-center mt-12">
      <p className="text-xl leading-relaxed mb-6">
        Ready to break down language barriers?
      </p>
      {/* <p className="text-xl leading-relaxed mb-6">
        Partner with us for your next translation project and let's achieve
        seamless global communication together.
      </p> */}
      <RequestACallBack />
    </div>
  );
}

export default AboutPage;
