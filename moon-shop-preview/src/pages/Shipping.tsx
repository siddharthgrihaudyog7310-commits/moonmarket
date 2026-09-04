import InfoPage from '../components/InfoPage';

export default function Shipping() {
  return (
    <InfoPage title="Shipping Inquiry" subtitle="Bespoke Logistics">
      <div>
        <h2>Where We Deliver</h2>
        <p>We deliver across India. Delivery timelines vary by location and will be confirmed with you on WhatsApp when your order is placed.</p>
      </div>
      <div>
        <h2>How It Works</h2>
        <p>
          Once you send your order details from the checkout page, we confirm availability, delivery charges (if
          any) and an estimated delivery date with you directly over WhatsApp before dispatch.
        </p>
      </div>
      <div>
        <h2>Packaging</h2>
        <p>
          All dry fruits, spices and seeds are freshly packed and sealed at the time of dispatch to preserve
          quality in transit.
        </p>
      </div>
      <div>
        <h2>Questions About Your Order</h2>
        <p>
          For the fastest update on delivery status, message us directly on{' '}
          <a href="https://wa.me/917054578781" target="_blank" rel="noopener noreferrer" className="text-brand-gold underline">
            WhatsApp
          </a>{' '}
          with your name and order details.
        </p>
      </div>
    </InfoPage>
  );
}
