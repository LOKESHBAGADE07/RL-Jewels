import useDocumentTitle from '../lib/useDocumentTitle';

export default function PrivacyPage() {
  useDocumentTitle('Privacy Policy');
  return (
    <section className="section-padding">
      <div className="max-content prose max-w-none">
        <h1>Privacy Policy</h1>
        <p>We respect your privacy. This policy explains what data we collect and how we use it.</p>
        <h2>Data We Collect</h2>
        <ul>
          <li>Contact details you provide (name, email, phone)</li>
          <li>Order and payment information</li>
          <li>Usage data to improve our services</li>
        </ul>
        <h2>Security</h2>
        <p>We follow industry best practices to protect your personal data.</p>
        <h2>Contact</h2>
        <p>For privacy requests, email privacy@rljewels.com.</p>
      </div>
    </section>
  );
}
