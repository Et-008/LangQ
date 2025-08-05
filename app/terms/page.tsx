import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lang Q | Terms of service",
  description:
    "Lang Q is a professional translation service started to provide fast, accurate, and culturally-aware translations tailored for businesses looking to scale globally with confidence.",
  alternates: {
    canonical: `https://lang-q.com/terms`,
  },
};

const TermsOfService = () => {
  return (
    <section className="max-w-3xl mx-auto px-4 py-12 text-gray-800 dark:text-gray-200 space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-8">Lang Q Terms of Service</h1>
        <p>
          <strong>Effective Date:</strong> August 4, 2025
        </p>
        <p>
          Welcome to Lang Q! These terms govern your use of our Flutter
          localization platform.
        </p>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Using Lang Q</h2>
        <p>
          <strong>Acceptable Use:</strong> Use Lang Q for legitimate
          localization needs. Don't:
        </p>
        <ul className="list-disc list-inside space-y-1">
          <li>Use the service for illegal activities</li>
          <li>Attempt to reverse engineer our platform</li>
          <li>Upload malicious code or content</li>
          <li>Violate others' intellectual property rights</li>
          <li>Create competing localization services using our platform</li>
        </ul>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">
          Your Content & Our Service
        </h2>
        <ul className="list-disc list-inside space-y-1">
          <li>
            <strong>Your Ownership:</strong> You retain full ownership of your
            source text, translation keys, and generated translations.
          </li>
          <li>
            <strong>Our License:</strong> You grant us permission to process
            your content to provide translation services, but we won't use it
            for any other purpose.
          </li>
          <li>
            <strong>Service Availability:</strong> We aim for 99.5% uptime but
            can't guarantee uninterrupted service. We'll provide reasonable
            notice for planned maintenance.
          </li>
        </ul>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Termination</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>
            <strong>By You:</strong> Cancel anytime through your account
            settings. Your data remains accessible for 30 days after
            cancellation.
          </li>
          <li>
            <strong>By Us:</strong> We may suspend service for violations of
            these terms with reasonable notice when possible. Immediate
            suspension for serious violations (illegal use, security threats).
          </li>
          <li>
            <strong>Data Export:</strong> You can export all your translation
            data before or within 30 days after termination.
          </li>
        </ul>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Disclaimers & Limits</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>
            <strong>Service Provided "As Is":</strong> While we strive for
            accuracy, we can't guarantee perfect translations or 100% uptime.
          </li>
          <li>
            <strong>Liability Limit:</strong> Our total liability is limited to
            the amount you paid us in the past 12 months (minimum $100).
          </li>
          <li>
            <strong>No Consequential Damages:</strong> We're not liable for lost
            profits, data loss, or business interruption.
          </li>
        </ul>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Intellectual Property</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>
            <strong>Our Platform:</strong> Lang Q's software, algorithms, and
            documentation are our property.
          </li>
          <li>
            <strong>Your Rights:</strong> These terms don't limit your rights to
            your own content and translations.
          </li>
        </ul>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Contact Us</h2>
        <p>
          Questions about these terms? Email us at{" "}
          <a href="mailto:team@lang-q.com" className="text-blue-500 underline">
            team@lang-q.com
          </a>
        </p>
      </div>
    </section>
  );
  // return (
  //   <div className="max-w-3xl mx-auto px-4 py-12 text-gray-800 dark:text-gray-200">
  //     <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
  //     <p className="text-sm text-gray-500 mb-8">Effective Date: 19/07/2025</p>

  //     <section className="space-y-6">
  //       <div>
  //         <h2 className="text-xl font-semibold mb-2">1. Use of the Service</h2>
  //         <p>
  //           You may use our Service only if you are legally capable of forming a
  //           binding contract. You agree to use the Service in accordance with
  //           all applicable laws.
  //         </p>
  //       </div>

  //       <div>
  //         <h2 className="text-xl font-semibold mb-2">2. User Accounts</h2>
  //         <p>
  //           You may need to create an account to access certain features. You
  //           agree to provide accurate information and keep it up to date. You
  //           are responsible for maintaining the confidentiality of your account
  //           credentials.
  //         </p>
  //       </div>

  //       <div>
  //         <h2 className="text-xl font-semibold mb-2">3. Prohibited Conduct</h2>
  //         <ul className="list-disc list-inside space-y-1">
  //           <li>Using the Service for unlawful purposes</li>
  //           <li>Interfering with or disrupting the Service</li>
  //           <li>Uploading malicious code</li>
  //           <li>Violating intellectual property rights</li>
  //         </ol>
  //       </div>

  //       <div>
  //         <h2 className="text-xl font-semibold mb-2">
  //           4. Intellectual Property
  //         </h2>
  //         <p>
  //           All content on the Service is owned by{" "}
  //           <a className="text-sky-500" href="https://lang-q.com">
  //             Lang Q{" "}
  //           </a>{" "}
  //           or its licensors. You may not copy, distribute, or use any content
  //           without permission.
  //         </p>
  //       </div>

  //       <div>
  //         <h2 className="text-xl font-semibold mb-2">
  //           5. Third-Party Services
  //         </h2>
  //         <p>
  //           Our Service may contain links to third-party services. We are not
  //           responsible for their content or practices.
  //         </p>
  //       </div>

  //       <div>
  //         <h2 className="text-xl font-semibold mb-2">6. Termination</h2>
  //         <p>
  //           We reserve the right to terminate or suspend your access to the
  //           Service at our sole discretion without notice.
  //         </p>
  //       </div>

  //       <div>
  //         <h2 className="text-xl font-semibold mb-2">7. Disclaimers</h2>
  //         <p>
  //           The Service is provided “as is” without warranties of any kind. We
  //           do not guarantee accuracy or availability.
  //         </p>
  //       </div>

  //       <div>
  //         <h2 className="text-xl font-semibold mb-2">
  //           8. Limitation of Liability
  //         </h2>
  //         <p>
  //           <a className="text-sky-500" href="https://lang-q.com">
  //             Lang Q{" "}
  //           </a>{" "}
  //           shall not be liable for indirect or consequential damages arising
  //           from your use of the Service.
  //         </p>
  //       </div>

  //       <div>
  //         <h2 className="text-xl font-semibold mb-2">9. Indemnification</h2>
  //         <p>
  //           You agree to indemnify{" "}
  //           <a className="text-sky-500" href="https://lang-q.com">
  //             Lang Q{" "}
  //           </a>{" "}
  //           against any claims or losses resulting from your violation of these
  //           Terms.
  //         </p>
  //       </div>

  //       <div>
  //         <h2 className="text-xl font-semibold mb-2">
  //           10. Changes to These Terms
  //         </h2>
  //         <p>
  //           We may update these Terms from time to time. Continued use of the
  //           Service means you accept any changes.
  //         </p>
  //       </div>

  //       <div>
  //         <h2 className="text-xl font-semibold mb-2">11. Governing Law</h2>
  //         <p>These Terms are governed by the laws of California.</p>
  //       </div>

  //       <div>
  //         <h2 className="text-xl font-semibold mb-2">12. Contact Us</h2>
  //         <p>
  //           If you have any questions, contact us at:
  //           <br />
  //           📧{" "}
  //           <a href="mailto:your@email.com" className="text-blue-500 underline">
  //             team@lang-q.com
  //           </a>
  //           <br />
  //           🏢 2, Hacker way, California.
  //         </p>
  //       </div>
  //     </section>
  //   </div>
  // );
};

export default TermsOfService;
