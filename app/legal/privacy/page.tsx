export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto py-12 space-y-6">
      <h1 className="text-3xl font-bold">Privacy Policy</h1>
      <p>
        We are committed to protecting your personal information and complying with applicable data
        protection laws, including PDPA and GDPR where relevant.
      </p>

      <h2 className="text-xl font-semibold">1. Information We Collect</h2>
      <ul className="list-disc pl-6 space-y-1">
        <li>Account information (name, email, password hashed securely)</li>
        <li>Usage and device information</li>
        <li>
          <strong>Biometric face data (when enabled)</strong> — stored as encrypted templates, not
          raw images, when possible
        </li>
      </ul>

      <h2 className="text-xl font-semibold">2. Purpose of Processing</h2>
      <p>We use data to:</p>
      <ul className="list-disc pl-6 space-y-1">
        <li>Provide secure sign-in and identity verification</li>
        <li>Maintain account access and security</li>
        <li>Improve service performance and user experience</li>
      </ul>
      <p>
        Biometric data is used <strong>only</strong> for authentication and security — never for
        advertising, profiling, or facial recognition outside the system.
      </p>

      <h2 className="text-xl font-semibold">3. Data Security</h2>
      <p>
        We use encryption, secure storage, and access controls to protect your data. Biometric
        templates are protected with industry-standard security measures.
      </p>

      <h2 className="text-xl font-semibold">4. Data Sharing</h2>
      <p>
        We do not sell personal data. Data may be shared only with trusted service providers
        necessary for system operation (e.g., secure cloud hosting) or when legally required.
      </p>

      <h2 className="text-xl font-semibold">5. Data Retention</h2>
      <p>
        Data is retained as long as your account remains active. Upon account deletion request, data
        will be erased within a reasonable period unless legal obligations require retention.
      </p>

      <h2 className="text-xl font-semibold">6. Your Rights</h2>
      <p>You may:</p>
      <ul className="list-disc pl-6 space-y-1">
        <li>Request access to your data</li>
        <li>Request correction or deletion</li>
        <li>Withdraw consent for biometric processing</li>
        <li>Export your data</li>
      </ul>

      <h2 className="text-xl font-semibold">7. Contact</h2>
      <p>
        For privacy inquiries or data removal requests, contact us at:{" "}
        <strong>support@example.com</strong>
      </p>

      <p>Last updated: {new Date().toLocaleDateString()}</p>
    </div>
  )
}
