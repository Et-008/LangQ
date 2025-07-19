const PrivacyPolicy = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12 text-gray-800 dark:text-gray-200">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <p className="text-sm text-gray-500 mb-8">Effective Date: 19/07/2025</p>

      <section className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-2">
            1. Information We Collect
          </h2>
          <p>We may collect the following types of information:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>
              <strong>Personal Information:</strong> Name, email, contact
              details, and any other info you provide.
            </li>
            <li>
              <strong>Usage Data:</strong> IP address, browser type, pages
              visited, time spent, and diagnostic data.
            </li>
            <li>
              <strong>Cookies:</strong> We use cookies and similar tracking
              technologies to enhance your experience.
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">
            2. How We Use Your Information
          </h2>
          <ul className="list-disc list-inside space-y-1">
            <li>To operate and maintain the Service</li>
            <li>To improve and personalize user experience</li>
            <li>To communicate with you</li>
            <li>To ensure security and prevent fraud</li>
            <li>To comply with legal obligations</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">
            3. Sharing Your Information
          </h2>
          <p>
            We do not sell your personal information. We may share data with:
          </p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Service providers that assist in operating our business</li>
            <li>Legal authorities when required by law</li>
            <li>Affiliates under common ownership</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">4. Your Rights</h2>
          <p>Depending on your location, you may have rights to:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Access and update your personal data</li>
            <li>Request deletion of your data</li>
            <li>Withdraw consent to data processing</li>
            <li>Request data portability</li>
          </ul>
          <p className="mt-2">
            To exercise your rights, contact us at:{" "}
            <a href="mailto:your@email.com" className="text-blue-500 underline">
              your@email.com
            </a>
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">5. Data Security</h2>
          <p>
            We use appropriate security measures to protect your information.
            However, no system is completely secure.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">6. Third-Party Links</h2>
          <p>
            Our website may contain links to other sites. We are not responsible
            for their privacy practices or content.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">7. Children’s Privacy</h2>
          <p>
            We do not knowingly collect personal information from children under
            13. If we discover such data, we will delete it.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">
            8. Changes to This Policy
          </h2>
          <p>
            We may update this Privacy Policy. Any changes will be posted on
            this page with a new effective date.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">9. Contact Us</h2>
          <p>
            If you have any questions, please contact us at:
            <br />
            📧{" "}
            <a href="mailto:your@email.com" className="text-blue-500 underline">
              team@lang-q.com
            </a>
            <br />
            🏢 2, Hacker way, California.
          </p>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
