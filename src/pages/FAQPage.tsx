import useDocumentTitle from '../lib/useDocumentTitle';

export default function FAQPage() {
  useDocumentTitle('FAQ');
  return (
    <section className="section-padding">
      <div className="max-content prose max-w-none">
        <h1>Frequently Asked Questions</h1>
        <h2>Is your gold BIS hallmarked?</h2>
        <p>Yes, all our gold jewellery is BIS hallmarked.</p>
        <h2>How is pricing calculated?</h2>
        <p>Live gold rate × net weight + making charges + 3% GST.</p>
        <h2>What are delivery timelines?</h2>
        <p>Typically 2-7 business days depending on the pincode.</p>
      </div>
    </section>
  );
}
