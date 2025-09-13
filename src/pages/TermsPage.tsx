import useDocumentTitle from '../lib/useDocumentTitle';

export default function TermsPage() {
  useDocumentTitle('Terms & Conditions');
  return (
    <section className="section-padding">
      <div className="max-content prose max-w-none">
        <h1>Terms & Conditions</h1>
        <p>These Terms govern your use of RL Jewels website and purchases made on the platform.</p>
        <h2>Use of Site</h2>
        <p>By accessing this website, you agree to comply with these Terms. Do not misuse the services.</p>
        <h2>Pricing & Taxes</h2>
        <p>Prices vary based on daily gold rates. GST (3%) is applied as per law.</p>
        <h2>Order & Fulfilment</h2>
        <p>Orders are subject to availability and confirmation. We will notify you of any delays.</p>
        <h2>Contact</h2>
        <p>For any queries, contact info@rljewels.com.</p>
      </div>
    </section>
  );
}
