import Breadcrumb from "@/components/Common/Breadcrumb";
import Contact from "@/components/Contact";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Page | Free Next.js Template for Startup and SaaS",
  description: "This is Contact Page for Startup Nextjs Template",
  // other metadata
};

const ContactPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="Contact Us"
        description="Let's Talk Language – We'd Love to Hear From You!"
      />

      <Contact />
      <section id="contact" className="overflow-hidden py-6 md:py-10 lg:py-18">
        <div
          className="flex flex-wrap w-full mb-12 rounded-sm bg-white px-8 py-11 border shadow-three dark:bg-gray-dark sm:p-[55px] lg:mb-5 lg:px-8 xl:p-[55px]"
          data-wow-delay=".15s"
        >
          <div className="px-3 lg:w-7/12 xl:w-4/12">
            <h3 className="mb-3 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
              📨 General Inquiries
            </h3>
            <p className="flex flex-col gap-1 text-base font-medium text-body-color">
              <span>Email: hello@langq.io </span>
              <span>Phone: +1 (555) 123-4567 Business Hours:</span>
              <span>Monday – Friday, 9:00 AM – 6:00 PM (GMT)</span>
            </p>
          </div>
          <div className="px-3 lg:w-7/12 xl:w-4/12">
            <h3 className="mb-3 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
              🛠️ Customer Support
            </h3>
            <p className="flex flex-col gap-1 text-base font-medium text-body-color">
              <span>Need help with your translations or account?</span>
              <span>
                Visit our Support Center or email us directly at
                support@langq.io.
              </span>
            </p>
          </div>
          <div className="px-3 lg:w-7/12 xl:w-4/12">
            <h3 className="mb-3 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
              📍 Head Office
            </h3>
            <p className="flex flex-col gap-1 text-base font-medium text-body-color">
              <span>LangQ Ltd.</span>
              <span>123 Translingo Street</span>
              <span>San Francisco, CA 94107</span>
              <span>USA</span>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactPage;
