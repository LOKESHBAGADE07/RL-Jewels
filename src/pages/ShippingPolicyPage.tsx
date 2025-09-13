import useDocumentTitle from '../lib/useDocumentTitle';

export default function ShippingPolicyPage() {
  useDocumentTitle('Shipping Policy');
  return (
    <section className="section-padding">
      <div className="max-content prose max-w-none">
        <h1>Shipping Policy</h1>
        <p>We ship across India using trusted logistics partners. Orders are insured.</p>
        <h2>Timelines</h2>
        <p>Orders are typically dispatched in 2-4 business days. Delivery times vary by pincode.</p>
        <h2>Fees</h2>
        <p>Shipping is free for orders above ₹49,999. A flat fee applies otherwise.</p>
      </div>
    </section>
  );
}
