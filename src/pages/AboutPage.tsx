import useDocumentTitle from '../lib/useDocumentTitle';

export default function AboutPage() {
  useDocumentTitle('About');
  return (
    <section className="section-padding">
      <div className="max-content prose max-w-none">
        <h1>About RL Jewels</h1>
        <p>Founded in Jalgaon – The Gold City, RL Jewels blends tradition with modern design.</p>
        <p>We are committed to BIS hallmark purity, transparent pricing, and delightful service.</p>
      </div>
    </section>
  );
}
