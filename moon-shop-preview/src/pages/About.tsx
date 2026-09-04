import InfoPage from '../components/InfoPage';

export default function About() {
  return (
    <InfoPage title="Precision Sourcing" subtitle="Our Provenance">
      <p>
        Moon Spices &amp; Groceries has brought India's finest dry fruits, dry dates, and whole spices from trusted
        farms to your home since 1996. What started as a single storefront has grown into a name people in and
        around Lucknow trust for quality that doesn't cut corners.
      </p>
      <p>
        Every batch is chosen, weighed, and packed by hand — no shortcuts, no filler, no unnamed "premium" claims we
        can't stand behind. If it's on this site, it's what actually ships to your door.
      </p>
      <div>
        <h2>Get in Touch</h2>
        <p>
          Have a question about a product or want to place a custom order? Reach us on{' '}
          <a href="https://wa.me/917054578781" target="_blank" rel="noopener noreferrer" className="text-brand-gold underline">
            WhatsApp
          </a>{' '}
          anytime.
        </p>
      </div>
    </InfoPage>
  );
}
