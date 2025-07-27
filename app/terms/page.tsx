const TermsOfService = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12 text-gray-800 dark:text-gray-200">
      <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
      <p className="text-sm text-gray-500 mb-8">Effective Date: 19/07/2025</p>

      <section className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-2">1. Use of the Service</h2>
          <p>
            You may use our Service only if you are legally capable of forming a
            binding contract. You agree to use the Service in accordance with
            all applicable laws.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">2. User Accounts</h2>
          <p>
            You may need to create an account to access certain features. You
            agree to provide accurate information and keep it up to date. You
            are responsible for maintaining the confidentiality of your account
            credentials.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">3. Prohibited Conduct</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>Using the Service for unlawful purposes</li>
            <li>Interfering with or disrupting the Service</li>
            <li>Uploading malicious code</li>
            <li>Violating intellectual property rights</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">
            4. Intellectual Property
          </h2>
          <p>
            All content on the Service is owned by{" "}
            <a className="text-sky-500" href="https://lang-q.com">
              Lang Q{" "}
            </a>{" "}
            or its licensors. You may not copy, distribute, or use any content
            without permission.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">
            5. Third-Party Services
          </h2>
          <p>
            Our Service may contain links to third-party services. We are not
            responsible for their content or practices.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">6. Termination</h2>
          <p>
            We reserve the right to terminate or suspend your access to the
            Service at our sole discretion without notice.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">7. Disclaimers</h2>
          <p>
            The Service is provided “as is” without warranties of any kind. We
            do not guarantee accuracy or availability.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">
            8. Limitation of Liability
          </h2>
          <p>
            <a className="text-sky-500" href="https://lang-q.com">
              Lang Q{" "}
            </a>{" "}
            shall not be liable for indirect or consequential damages arising
            from your use of the Service.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">9. Indemnification</h2>
          <p>
            You agree to indemnify{" "}
            <a className="text-sky-500" href="https://lang-q.com">
              Lang Q{" "}
            </a>{" "}
            against any claims or losses resulting from your violation of these
            Terms.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">
            10. Changes to These Terms
          </h2>
          <p>
            We may update these Terms from time to time. Continued use of the
            Service means you accept any changes.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">11. Governing Law</h2>
          <p>These Terms are governed by the laws of California.</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">12. Contact Us</h2>
          <p>
            If you have any questions, contact us at:
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

export default TermsOfService;
