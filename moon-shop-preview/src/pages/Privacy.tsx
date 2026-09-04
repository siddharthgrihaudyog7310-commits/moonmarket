import InfoPage from '../components/InfoPage';

export default function Privacy() {
  return (
    <InfoPage title="Privacy Policy" subtitle="Privacy Protocol">
      <div>
        <h2>What We Collect</h2>
        <p>
          When you place an order, we collect the details you share with us over WhatsApp — your name, delivery
          address, phone number, and order details. We only use this information to fulfil and deliver your order.
        </p>
      </div>
      <div>
        <h2>How We Use It</h2>
        <p>
          Your information is used solely to process orders and communicate with you about them. We do not sell or
          share your personal information with third parties for marketing purposes.
        </p>
      </div>
      <div>
        <h2>Cart & Browsing</h2>
        <p>
          Items you add to your cart on this site are stored only in your own browser (not on our servers) and are
          cleared when you close the tab, unless you complete your order via WhatsApp.
        </p>
      </div>
      <div>
        <h2>Contact</h2>
        <p>
          For any questions about how your data is handled, message us on{' '}
          <a href="https://wa.me/917054578781" target="_blank" rel="noopener noreferrer" className="text-brand-gold underline">
            WhatsApp
          </a>
          .
        </p>
      </div>
    </InfoPage>
  );
}
