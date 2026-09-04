import { MessageCircle, Instagram, MapPin } from 'lucide-react';
import InfoPage from '../components/InfoPage';

export default function Contact() {
  return (
    <InfoPage title="Connect with Us" subtitle="Assistance">
      <p>
        The fastest way to reach us for orders, custom quantities, or questions about a product is WhatsApp — we
        reply personally, not through a bot.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
        <a
          href="https://wa.me/917054578781"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 bg-white border border-brand-green/10 px-6 py-5 hover:border-brand-gold transition-colors"
        >
          <MessageCircle className="text-brand-gold" size={20} />
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-green/40">WhatsApp</p>
            <p className="text-sm font-bold text-brand-green">+91 70545 78781</p>
          </div>
        </a>
        <a
          href="https://www.instagram.com/moon_spices_groceries"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 bg-white border border-brand-green/10 px-6 py-5 hover:border-brand-gold transition-colors"
        >
          <Instagram className="text-brand-gold" size={20} />
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-green/40">Instagram</p>
            <p className="text-sm font-bold text-brand-green">@moon_spices_groceries</p>
          </div>
        </a>
      </div>
      <div className="flex items-center gap-4 pt-2 text-brand-green/60">
        <MapPin className="text-brand-gold" size={18} />
        <p className="text-sm font-bold">Lucknow, Uttar Pradesh, India</p>
      </div>
    </InfoPage>
  );
}
