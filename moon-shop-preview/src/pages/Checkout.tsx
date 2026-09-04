import { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import {
  Truck,
  ChevronRight,
  ArrowLeft,
  CheckCircle2,
  MessageCircle,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { CartItem } from '../types';

const WHATSAPP_NUMBER = '917054578781';

interface CheckoutProps {
  cart: CartItem[];
}

export default function Checkout({ cart }: CheckoutProps) {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);
  const [shippingInfo, setShippingInfo] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
  });

  const subtotal = useMemo(() => cart.reduce((sum, item) => sum + item.price * item.quantity, 0), [cart]);
  const shipping = subtotal > 1500 ? 0 : 150;
  const total = subtotal + shipping;

  const buildWhatsAppMessage = () => {
    const lines = [
      `Hi Moon Spices & Groceries! I'd like to place this order:`,
      '',
      ...cart.map((item) => `• ${item.name} (${item.selectedWeight}) x${item.quantity} — ₹${item.price * item.quantity}`),
      '',
      `Subtotal: ₹${subtotal}`,
      `Shipping: ${shipping === 0 ? 'Complimentary' : `₹${shipping}`}`,
      `Total: ₹${total}`,
      '',
      `Name: ${shippingInfo.fullName || '-'}`,
      `Address: ${shippingInfo.address || '-'}, ${shippingInfo.city || '-'} ${shippingInfo.postalCode || ''}`.trim(),
      `Email: ${shippingInfo.email || '-'}`,
    ];
    return encodeURIComponent(lines.join('\n'));
  };

  const handleSendOrder = () => {
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${buildWhatsAppMessage()}`, '_blank', 'noopener,noreferrer');
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-brand-cream flex items-center justify-center p-6 pt-32">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white p-12 text-center shadow-2xl border border-brand-green/5"
        >
          <div className="flex justify-center mb-8">
            <CheckCircle2 size={80} className="text-brand-gold" strokeWidth={1} />
          </div>
          <h1 className="text-4xl font-serif font-medium italic text-brand-green mb-6">Order Sent</h1>
          <p className="text-brand-green/60 mb-10 leading-relaxed font-normal">
            Your order has been sent to us on WhatsApp. We'll confirm availability, pricing, and delivery with you directly in the chat.
          </p>
          <Link 
            to="/" 
            className="inline-block bg-brand-green text-white px-12 py-5 font-bold uppercase text-[10px] tracking-[0.3em] hover:bg-brand-gold transition-all"
          >
            Return to Home
          </Link>
        </motion.div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-brand-cream flex flex-col items-center justify-center p-6 pt-32">
        <h1 className="text-3xl font-serif italic text-brand-green mb-6">The bag is empty</h1>
        <Link to="/shop" className="text-brand-gold font-black uppercase text-[10px] tracking-[0.4em] border-b-2 border-brand-gold pb-1">
          Explore the Collection
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-cream pt-32 pb-20 px-6 sm:px-8">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex items-center space-x-4 mb-12">
          <button 
            onClick={() => navigate(-1)} 
            className="flex items-center space-x-2 text-brand-green/60 hover:text-brand-green transition-colors text-[10px] font-bold uppercase tracking-[0.1em]"
          >
            <ArrowLeft size={14} />
            <span>Back</span>
          </button>
          <div className="h-px w-20 bg-brand-green/10" />
          <h1 className="text-3xl font-serif font-medium italic text-brand-green">Secure Checkout</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          {/* Main Checkout View */}
          <div className="lg:col-span-7 space-y-12">
            
            {/* Steps Indicator */}
            <div className="flex items-center space-x-8 mb-16">
              {[1, 2].map((i) => (
                <div key={i} className="flex items-center space-x-4">
                  <div className={`w-8 h-8 flex items-center justify-center font-bold text-[10px] border ${step === i ? 'bg-brand-gold border-brand-gold text-brand-green' : 'border-brand-green/20 text-brand-green/40'}`}>
                    0{i}
                  </div>
                  <span className={`text-[10px] font-bold uppercase tracking-[0.1em] ${step === i ? 'text-brand-green' : 'text-brand-green/30'}`}>
                    {i === 1 ? 'Shipping' : 'Payment'}
                  </span>
                  {i === 1 && <ChevronRight size={14} className="text-brand-green/20" />}
                </div>
              ))}
            </div>

            {step === 1 ? (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-12"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-[0.1em] text-brand-green/50">Full Name</label>
                    <input type="text" value={shippingInfo.fullName} onChange={(e) => setShippingInfo((s) => ({ ...s, fullName: e.target.value }))} className="w-full bg-white border border-brand-green/10 px-6 py-4 text-sm font-bold tracking-tight outline-none focus:border-brand-gold transition-colors" placeholder="e.g. Sarthak Negi" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-[0.1em] text-brand-green/50">Email Address</label>
                    <input type="email" value={shippingInfo.email} onChange={(e) => setShippingInfo((s) => ({ ...s, email: e.target.value }))} className="w-full bg-white border border-brand-green/10 px-6 py-4 text-sm font-bold tracking-tight outline-none focus:border-brand-gold transition-colors" placeholder="sarthak@example.com" />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-[0.1em] text-brand-green/50">Shipping Address</label>
                    <textarea value={shippingInfo.address} onChange={(e) => setShippingInfo((s) => ({ ...s, address: e.target.value }))} className="w-full bg-white border border-brand-green/10 px-6 py-4 text-sm font-bold tracking-tight outline-none focus:border-brand-gold transition-colors h-32 resize-none" placeholder="Enter your full street address..." />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-[0.1em] text-brand-green/50">City</label>
                    <input type="text" value={shippingInfo.city} onChange={(e) => setShippingInfo((s) => ({ ...s, city: e.target.value }))} className="w-full bg-white border border-brand-green/10 px-6 py-4 text-sm font-bold tracking-tight outline-none focus:border-brand-gold transition-colors" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-[0.1em] text-brand-green/50">Postal Code</label>
                    <input type="text" value={shippingInfo.postalCode} onChange={(e) => setShippingInfo((s) => ({ ...s, postalCode: e.target.value }))} className="w-full bg-white border border-brand-green/10 px-6 py-4 text-sm font-bold tracking-tight outline-none focus:border-brand-gold transition-colors" />
                  </div>
                </div>
                <button
                  onClick={() => setStep(2)}
                  className="w-full md:w-auto bg-brand-green text-white px-16 py-6 font-bold uppercase text-[10px] tracking-[0.3em] hover:bg-brand-gold transition-all shadow-xl"
                >
                  Review Order
                </button>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-12"
              >
                <div className="bg-white p-10 border border-brand-green/5 space-y-6 shadow-xl">
                  <div className="flex items-center space-x-3">
                    <MessageCircle className="text-[#25D366]" size={20} />
                    <span className="text-[11px] font-black uppercase tracking-[0.2em]">Order via WhatsApp</span>
                  </div>
                  <p className="text-sm text-brand-green/60 leading-relaxed">
                    Online payment isn't set up yet. Tap below to send this order &mdash; items, quantities, and your
                    shipping details &mdash; directly to us on WhatsApp, and we'll confirm pricing, availability, and
                    delivery with you there.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-6">
                  <button
                    onClick={() => setStep(1)}
                    className="flex-1 border border-brand-green text-brand-green px-12 py-6 font-black uppercase text-[10px] tracking-[0.5em] hover:bg-brand-green hover:text-white transition-all"
                  >
                    Back to Shipping
                  </button>
                  <button
                    onClick={handleSendOrder}
                    className="flex-1 bg-[#25D366] text-white px-12 py-6 font-black uppercase text-[10px] tracking-[0.5em] hover:brightness-95 transition-all shadow-xl flex items-center justify-center space-x-3"
                  >
                    <MessageCircle size={16} />
                    <span>Send Order via WhatsApp</span>
                  </button>
                </div>
              </motion.div>
            )}

            <div className="pt-20 border-t border-brand-green/5 grid grid-cols-1 sm:grid-cols-3 gap-8">
              <div className="flex items-center space-x-4 opacity-40">
                <MessageCircle size={24} strokeWidth={1} />
                <span className="text-[9px] font-black uppercase tracking-widest leading-tight">Order via <br/> WhatsApp</span>
              </div>
              <div className="flex items-center space-x-4 opacity-40">
                <Truck size={24} strokeWidth={1} />
                <span className="text-[9px] font-black uppercase tracking-widest leading-tight">Expedited <br/> Logistics</span>
              </div>
              <div className="flex items-center space-x-4 opacity-40">
                <Truck size={20} strokeWidth={1} />
                <span className="text-[9px] font-black uppercase tracking-widest leading-tight">Pan-India <br/> Delivery</span>
              </div>
            </div>
          </div>

          {/* Sidebar - Summary */}
          <div className="lg:col-span-5">
            <div className="bg-white p-10 border border-brand-green/5 shadow-2xl sticky top-40">
              <h3 className="text-[12px] font-black uppercase tracking-[0.4em] mb-10 pb-4 border-b border-brand-green/5">Summary</h3>
              
              <div className="space-y-8 mb-10 max-h-[400px] overflow-y-auto pr-4 custom-scrollbar">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between items-start">
                    <div className="flex space-x-4">
                      <div className="w-16 h-16 bg-brand-cream border border-brand-green/5 p-2 overflow-hidden shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="text-xs font-bold leading-tight line-clamp-1">{item.name}</p>
                        <p className="text-[9px] text-brand-gold font-bold uppercase mt-1">{item.selectedWeight}</p>
                        <p className="text-[10px] font-medium opacity-40 mt-1">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <p className="text-xs font-bold">₹{item.price * item.quantity}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-4 pt-8 border-t border-brand-green/5">
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-[0.1em] text-brand-green/60">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-[0.1em] text-brand-green/60">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'COMPLIMENTARY' : `₹${shipping}`}</span>
                </div>
                <div className="flex justify-between items-end pt-4">
                  <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-brand-green">Total</span>
                  <span className="text-3xl font-serif font-semibold text-brand-gold tracking-tight">₹{total}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
