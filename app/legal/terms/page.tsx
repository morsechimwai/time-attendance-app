export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto py-12 space-y-6">
      <h1 className="text-3xl font-bold">Terms of Service</h1>
      <p>
        By accessing or using this service, you agree to be bound by the following terms. If you do
        not agree, you may not use the service.
      </p>

      <h2 className="text-xl font-semibold">1. Use of Service</h2>
      <p>
        You agree to use the service legally and responsibly. You must not engage in actions that
        disrupt, damage, or compromise the system or other users.
      </p>

      <h2 className="text-xl font-semibold">2. User Content & Ownership</h2>
      <p>
        You retain ownership of the content you upload. By using this service, you grant us
        permission to process and store your content solely to operate and improve the service.
      </p>

      <h2 className="text-xl font-semibold">3. Biometric Data</h2>
      <p>
        If biometric facial data is collected, it is used exclusively for secure identity
        verification and access control. We do not sell or share biometric data for marketing or
        unrelated purposes.
      </p>

      <h2 className="text-xl font-semibold">4. Service Availability</h2>
      <p>
        We aim to provide stable service, but availability may be interrupted for maintenance or
        unforeseen issues. We reserve the right to modify or discontinue the service.
      </p>

      <h2 className="text-xl font-semibold">5. Fees & Billing</h2>
      <p>
        Some features may require a paid subscription. Cancellations and refunds follow our billing
        policy as described in your subscription plan.
      </p>

      <h2 className="text-xl font-semibold">6. Termination</h2>
      <p>
        We may suspend or terminate your account for violations of these terms. You may request
        account deletion at any time.
      </p>

      <h2 className="text-xl font-semibold">7. Limitation of Liability</h2>
      <p>
        This service is provided &quot;as is&quot;. We are not liable for damages caused by service
        interruptions, data loss, or unauthorized access outside our reasonable control.
      </p>

      <h2 className="text-xl font-semibold">8. Updates to Terms</h2>
      <p>
        We may update these terms periodically. Continued use after changes indicates acceptance of
        the updated terms.
      </p>

      <p>Last updated: {new Date().toLocaleDateString()}</p>
    </div>
  )
}
