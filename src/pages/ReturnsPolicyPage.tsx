import useDocumentTitle from '../lib/useDocumentTitle';

export default function ReturnsPolicyPage() {
  useDocumentTitle('Returns & Refunds');
  return (
    <section className="section-padding">
      <div className="max-content prose max-w-none">
        <h1>Return, Refund & Buy-Back Policy</h1>
        <p>We aim for 100% satisfaction. The following policies apply to purchases.</p>
        <h2>Returns</h2>
        <p>Returns accepted within 14 days in original condition with invoice.</p>
        <h2>Refunds</h2>
        <p>Refunds are processed to original payment method within 5-7 working days.</p>
        <h2>Buy-Back</h2>
        <p>Gold jewellery buy-back as per prevailing policies and inspection.</p>
      </div>
    </section>
  );
}
