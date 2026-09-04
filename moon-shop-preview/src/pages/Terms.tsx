import InfoPage from '../components/InfoPage';

export default function Terms() {
  return (
    <InfoPage title="Terms of Service" subtitle="Quality Warranties">
      <div>
        <h2>Orders</h2>
        <p>
          All orders placed through this website are confirmed over WhatsApp before dispatch. Prices shown are in
          Indian Rupees (INR) and are subject to change without prior notice. An order is confirmed only once we
          reply to your WhatsApp message with a final confirmation.
        </p>
      </div>
      <div>
        <h2>Product Quality</h2>
        <p>
          We source our dry fruits, spices and seeds from trusted suppliers and pack them fresh for every order. If
          you receive a product that is damaged, spoiled, or not what you ordered, contact us on WhatsApp within 48
          hours of delivery with photos, and we will make it right.
        </p>
      </div>
      <div>
        <h2>Payments</h2>
        <p>
          Orders are currently confirmed and settled directly over WhatsApp. We do not store any card or banking
          details on this website.
        </p>
      </div>
      <div>
        <h2>Contact</h2>
        <p>
          Questions about these terms can be sent to us anytime on{' '}
          <a href="https://wa.me/917054578781" target="_blank" rel="noopener noreferrer" className="text-brand-gold underline">
            WhatsApp
          </a>
          .
        </p>
      </div>
    </InfoPage>
  );
}
