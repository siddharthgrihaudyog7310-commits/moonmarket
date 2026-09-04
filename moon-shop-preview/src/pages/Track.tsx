import { useState } from 'react';
import InfoPage from '../components/InfoPage';

export default function Track() {
  const [orderRef, setOrderRef] = useState('');

  const message = `Hi Moon Spices & Groceries, I'd like an update on my order${orderRef ? ` (Ref: ${orderRef})` : ''}.`;
  const trackUrl = `https://wa.me/917054578781?text=${encodeURIComponent(message)}`;

  return (
    <InfoPage title="Track Your Order" subtitle="Bespoke Logistics">
      <p>
        We don't have an automated tracking portal yet — every order is tracked and updated personally over
        WhatsApp so you can talk to a real person about your delivery.
      </p>
      <div className="space-y-4 pt-2">
        <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-brand-green/50">
          Order reference or WhatsApp order date (optional)
        </label>
        <input
          type="text"
          value={orderRef}
          onChange={(e) => setOrderRef(e.target.value)}
          placeholder="e.g. order placed on 2 Sept"
          className="w-full bg-white border border-brand-green/10 px-6 py-4 text-sm font-bold tracking-tight outline-none focus:border-brand-gold transition-colors"
        />
        <a
          href={trackUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-brand-green text-white px-10 py-4 font-bold uppercase text-[10px] tracking-[0.4em] hover:bg-brand-gold transition-colors"
        >
          Ask on WhatsApp
        </a>
      </div>
    </InfoPage>
  );
}
