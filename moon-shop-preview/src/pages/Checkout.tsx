import { useState, useMemo, useEffect } from 'react';
import { motion } from 'motion/react';
import QRCode from 'qrcode';
import {
  Truck,
  ChevronRight,
  ArrowLeft,
  CheckCircle2,
  MessageCircle,
  CreditCard,
  Loader2,
  QrCode,
  Copy,
  Check,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { CartItem } from '../types';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabaseClient';

const WHATSAPP_NUMBER = '917054578781';
const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID as string | undefined;
const UPI_ID = 'MAB.037216043620012@axisbank';
const UPI_PAYEE_NAME = 'Moon Spices & Groceries';

declare global {
  interface Window {
    Razorpay: any;
  }
}

function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

interface CheckoutProps {
  cart: CartItem[];
  onClearCart: () => void;
}

function formatOrderRef(id: string) {
  return id.replace(/-/g, '').slice(0, 8).toUpperCase();
}

function buildUpiUri(amount: number) {
  const params = new URLSearchParams({
    pa: UPI_ID,
    pn: UPI_PAYEE_NAME,
    am: amount.toString(),
    cu: 'INR',
    tn: 'Moon Spices order',
  });
  return `upi://pay?${params.toString()}`;
}

export default function Checkout({ cart, onClearCart }: CheckoutProps) {
  const navigate = useNavigate();
  const { user, session } = useAuth();
  const [step, setStep] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'whatsapp' | 'paid' | 'upi' | null>(null);
  const [orderRef, setOrderRef] = useState<string | null>(null);
  const [isPaying, setIsPaying] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [upiQrDataUrl, setUpiQrDataUrl] = useState<string | null>(null);
  const [upiRef, setUpiRef] = useState('');
  const [upiIdCopied, setUpiIdCopied] = useState(false);
  const [shippingInfo, setShippingInfo] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
  });
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const subtotal = useMemo(() => cart.reduce((sum, item) => sum + item.price * item.quantity, 0), [cart]);
  const shipping = subtotal > 1500 ? 0 : 150;
  const total = subtotal + shipping;

  useEffect(() => {
    if (total <= 0) return;
    QRCode.toDataURL(buildUpiUri(total), { margin: 1, width: 240 })
      .then(setUpiQrDataUrl)
      .catch(() => setUpiQrDataUrl(null));
  }, [total]);

  // Prefill from the customer's saved account details, without overwriting anything they've already typed.
  useEffect(() => {
    if (!user || !supabase) return;
    supabase
      .from('profiles')
      .select('full_name, address, city, postal_code')
      .eq('id', user.id)
      .maybeSingle()
      .then(({ data }) => {
        if (!data) return;
        setShippingInfo((s) => ({
          fullName: s.fullName || data.full_name || '',
          email: s.email || user.email || '',
          address: s.address || data.address || '',
          city: s.city || data.city || '',
          postalCode: s.postalCode || data.postal_code || '',
        }));
      });
  }, [user]);

  const buildWhatsAppMessage = (paidViaUpi = false) => {
    const lines = [
      paidViaUpi
        ? `Hi Moon Spices & Groceries! I've paid for this order via UPI:`
        : `Hi Moon Spices & Groceries! I'd like to place this order:`,
      '',
      ...cart.map((item) => `• ${item.name} (${item.selectedWeight}) x${item.quantity} — ₹${item.price * item.quantity}`),
      '',
      `Subtotal: ₹${subtotal}`,
      `Shipping: ${shipping === 0 ? 'Complimentary' : `₹${shipping}`}`,
      `Total: ₹${total}`,
      ...(paidViaUpi ? ['', `UPI Reference: ${upiRef.trim() || 'not provided'}`] : []),
      '',
      `Name: ${shippingInfo.fullName || '-'}`,
      `Address: ${shippingInfo.address || '-'}, ${shippingInfo.city || '-'} ${shippingInfo.postalCode || ''}`.trim(),
      `Email: ${shippingInfo.email || '-'}`,
    ];
    return encodeURIComponent(lines.join('\n'));
  };

  const authHeaders = (): Record<string, string> => ({
    'Content-Type': 'application/json',
    ...(session ? { Authorization: `Bearer ${session.access_token}` } : {}),
  });

  const orderPayload = () => ({
    items: cart.map((item) => ({ id: item.id, selectedWeight: item.selectedWeight, quantity: item.quantity })),
    customer: { name: shippingInfo.fullName, email: shippingInfo.email },
    shipping: { address: shippingInfo.address, city: shippingInfo.city, postalCode: shippingInfo.postalCode },
  });

  const validateShipping = () => {
    const errors: Record<string, string> = {};
    if (!shippingInfo.fullName.trim()) errors.fullName = 'Required';
    if (!shippingInfo.address.trim()) errors.address = 'Required';
    if (!shippingInfo.city.trim()) errors.city = 'Required';
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleReviewOrder = () => {
    if (validateShipping()) setStep(2);
  };

  const handleSendOrder = () => {
    // Best-effort order log — must never block or fail the WhatsApp handoff itself.
    fetch('/api/log-order', {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify(orderPayload()),
    })
      .then((res) => res.json())
      .then((data) => data?.orderId && setOrderRef(formatOrderRef(data.orderId)))
      .catch(() => {});

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${buildWhatsAppMessage()}`, '_blank', 'noopener,noreferrer');
    setPaymentStatus('whatsapp');
    setIsSuccess(true);
    onClearCart();
  };

  const handleConfirmUpiPaid = () => {
    // Best-effort order log — must never block or fail the WhatsApp handoff itself.
    fetch('/api/log-order', {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify({ ...orderPayload(), paymentMethod: 'upi_manual', upiRef: upiRef.trim() }),
    })
      .then((res) => res.json())
      .then((data) => data?.orderId && setOrderRef(formatOrderRef(data.orderId)))
      .catch(() => {});

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${buildWhatsAppMessage(true)}`, '_blank', 'noopener,noreferrer');
    setPaymentStatus('upi');
    setIsSuccess(true);
    onClearCart();
  };

  const handleCopyUpiId = () => {
    navigator.clipboard.writeText(UPI_ID).then(() => {
      setUpiIdCopied(true);
      setTimeout(() => setUpiIdCopied(false), 2000);
    });
  };

  const handlePayOnline = async () => {
    setPaymentError(null);
    setIsPaying(true);
    try {
      const [scriptLoaded, createRes] = await Promise.all([
        loadRazorpayScript(),
        fetch('/api/create-order', {
          method: 'POST',
          headers: authHeaders(),
          body: JSON.stringify(orderPayload()),
        }),
      ]);

      if (!scriptLoaded) throw new Error('Could not load the payment gateway. Check your connection and try again.');
      if (!createRes.ok) throw new Error('Could not start the payment. Please try again.');

      const order = await createRes.json();

      const razorpay = new window.Razorpay({
        key: order.keyId,
        amount: order.amount,
        currency: order.currency,
        order_id: order.razorpayOrderId,
        name: 'Moon Spices & Groceries',
        description: 'Order Payment',
        prefill: {
          name: shippingInfo.fullName,
          email: shippingInfo.email,
          contact: '',
        },
        theme: { color: '#1B3022' },
        handler: async (response: { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string }) => {
          try {
            const verifyRes = await fetch('/api/verify-payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(response),
            });
            if (!verifyRes.ok) throw new Error('Payment could not be verified.');
            if (order.dbOrderId) setOrderRef(formatOrderRef(order.dbOrderId));
            setPaymentStatus('paid');
            setIsSuccess(true);
            onClearCart();
          } catch {
            setPaymentError('Payment went through but we could not confirm it automatically. Please message us on WhatsApp with your payment ID so we can verify manually.');
          } finally {
            setIsPaying(false);
          }
        },
        modal: {
          ondismiss: () => setIsPaying(false),
        },
      });

      razorpay.on('payment.failed', () => {
        setPaymentError('Payment failed or was cancelled. You can try again, or order via WhatsApp instead.');
        setIsPaying(false);
      });

      razorpay.open();
    } catch (err) {
      setPaymentError(err instanceof Error ? err.message : 'Something went wrong starting the payment.');
      setIsPaying(false);
    }
  };

  if (isSuccess) {
    const isPaid = paymentStatus === 'paid';
    const isUpi = paymentStatus === 'upi';
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
          <h1 className="text-4xl font-serif font-medium italic text-brand-green mb-6">
            {isPaid ? 'Payment Successful' : isUpi ? 'Payment Details Sent' : 'Order Sent'}
          </h1>
          <p className="text-brand-green/70 mb-6 leading-relaxed font-normal">
            {isPaid
              ? "Your payment has been received and your order is confirmed. We'll reach out on WhatsApp with delivery updates."
              : isUpi
              ? "We've sent your order and UPI payment details to our WhatsApp. We'll verify the payment and confirm your order shortly."
              : "Your order has been sent to us on WhatsApp. We'll confirm availability, pricing, and delivery with you directly in the chat."}
          </p>
          {orderRef && (
            <p className="text-[11px] font-black uppercase tracking-[0.3em] text-brand-gold mb-10">
              Order Reference: #{orderRef}
            </p>
          )}
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
                    <label className="text-[10px] font-bold uppercase tracking-[0.1em] text-brand-green/50">Full Name *</label>
                    <input type="text" value={shippingInfo.fullName} onChange={(e) => setShippingInfo((s) => ({ ...s, fullName: e.target.value }))} className={`w-full bg-white border px-6 py-4 text-sm font-bold tracking-tight outline-none focus:border-brand-gold transition-colors ${fieldErrors.fullName ? 'border-red-400' : 'border-brand-green/10'}`} placeholder="e.g. Sarthak Negi" />
                    {fieldErrors.fullName && <p className="text-[10px] font-bold text-red-500 uppercase tracking-widest">Please enter your name</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-[0.1em] text-brand-green/50">Email Address</label>
                    <input type="email" value={shippingInfo.email} onChange={(e) => setShippingInfo((s) => ({ ...s, email: e.target.value }))} className="w-full bg-white border border-brand-green/10 px-6 py-4 text-sm font-bold tracking-tight outline-none focus:border-brand-gold transition-colors" placeholder="sarthak@example.com" />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-[0.1em] text-brand-green/50">Shipping Address *</label>
                    <textarea value={shippingInfo.address} onChange={(e) => setShippingInfo((s) => ({ ...s, address: e.target.value }))} className={`w-full bg-white border px-6 py-4 text-sm font-bold tracking-tight outline-none focus:border-brand-gold transition-colors h-32 resize-none ${fieldErrors.address ? 'border-red-400' : 'border-brand-green/10'}`} placeholder="Enter your full street address..." />
                    {fieldErrors.address && <p className="text-[10px] font-bold text-red-500 uppercase tracking-widest">Please enter a delivery address</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-[0.1em] text-brand-green/50">City *</label>
                    <input type="text" value={shippingInfo.city} onChange={(e) => setShippingInfo((s) => ({ ...s, city: e.target.value }))} className={`w-full bg-white border px-6 py-4 text-sm font-bold tracking-tight outline-none focus:border-brand-gold transition-colors ${fieldErrors.city ? 'border-red-400' : 'border-brand-green/10'}`} />
                    {fieldErrors.city && <p className="text-[10px] font-bold text-red-500 uppercase tracking-widest">Please enter your city</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-[0.1em] text-brand-green/50">Postal Code</label>
                    <input type="text" value={shippingInfo.postalCode} onChange={(e) => setShippingInfo((s) => ({ ...s, postalCode: e.target.value }))} className="w-full bg-white border border-brand-green/10 px-6 py-4 text-sm font-bold tracking-tight outline-none focus:border-brand-gold transition-colors" />
                  </div>
                </div>
                <button
                  onClick={handleReviewOrder}
                  className="w-full md:w-auto bg-brand-green text-white px-16 py-6 font-bold uppercase text-[10px] tracking-[0.3em] hover:bg-brand-gold transition-all shadow-xl"
                >
                  Review Order
                </button>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                {RAZORPAY_KEY_ID && (
                  <div className="bg-white p-10 border border-brand-green/5 space-y-6 shadow-xl">
                    <div className="flex items-center space-x-3">
                      <CreditCard className="text-brand-gold" size={20} />
                      <span className="text-[11px] font-black uppercase tracking-[0.2em]">Pay Online</span>
                    </div>
                    <p className="text-sm text-brand-green/70 leading-relaxed">
                      Pay securely by card, UPI, or netbanking via Razorpay. Your order is confirmed the moment
                      payment succeeds.
                    </p>
                    <button
                      onClick={handlePayOnline}
                      disabled={isPaying}
                      className="w-full bg-brand-green text-white px-12 py-6 font-black uppercase text-[10px] tracking-[0.5em] hover:bg-brand-gold transition-all shadow-xl flex items-center justify-center space-x-3 disabled:opacity-60"
                    >
                      {isPaying ? <Loader2 size={16} className="animate-spin" /> : <CreditCard size={16} />}
                      <span>{isPaying ? 'Processing…' : `Pay ₹${total} Online`}</span>
                    </button>
                    {paymentError && (
                      <p className="text-xs font-bold text-red-600/80 leading-relaxed">{paymentError}</p>
                    )}
                  </div>
                )}

                <div className="bg-white p-10 border border-brand-green/5 space-y-6 shadow-xl">
                  <div className="flex items-center space-x-3">
                    <QrCode className="text-brand-gold" size={20} />
                    <span className="text-[11px] font-black uppercase tracking-[0.2em]">Pay via UPI</span>
                  </div>
                  <p className="text-sm text-brand-green/70 leading-relaxed">
                    Scan the QR code or pay directly to our UPI ID using any UPI app (Google Pay, PhonePe, Paytm).
                    Then confirm below and we'll verify and confirm your order on WhatsApp.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center gap-8">
                    {upiQrDataUrl && (
                      <img src={upiQrDataUrl} alt="UPI QR code" className="w-40 h-40 border border-brand-green/10 p-2 shrink-0" />
                    )}
                    <div className="w-full space-y-4">
                      <div className="flex items-center justify-between bg-brand-cream/60 border border-brand-green/10 px-5 py-4">
                        <span className="text-xs font-bold text-brand-green tracking-tight break-all">{UPI_ID}</span>
                        <button
                          onClick={handleCopyUpiId}
                          aria-label="Copy UPI ID"
                          className="shrink-0 ml-3 text-brand-green/50 hover:text-brand-gold transition-colors"
                        >
                          {upiIdCopied ? <Check size={16} className="text-green-600" /> : <Copy size={16} />}
                        </button>
                      </div>
                      <a
                        href={buildUpiUri(total)}
                        className="w-full bg-brand-green text-white px-8 py-4 font-black uppercase text-[10px] tracking-[0.3em] hover:bg-brand-gold transition-all shadow-lg flex items-center justify-center space-x-3"
                      >
                        <QrCode size={16} />
                        <span>Pay ₹{total} via UPI App</span>
                      </a>
                    </div>
                  </div>
                  <div className="space-y-2 pt-2">
                    <label className="text-[10px] font-bold uppercase tracking-[0.1em] text-brand-green/50">
                      UPI Transaction / Reference ID (optional, helps us verify faster)
                    </label>
                    <input
                      type="text"
                      value={upiRef}
                      onChange={(e) => setUpiRef(e.target.value)}
                      className="w-full bg-white border border-brand-green/10 px-6 py-4 text-sm font-bold tracking-tight outline-none focus:border-brand-gold transition-colors"
                      placeholder="e.g. 123456789012"
                    />
                  </div>
                  <button
                    onClick={handleConfirmUpiPaid}
                    className="w-full bg-brand-gold text-brand-green px-12 py-6 font-black uppercase text-[10px] tracking-[0.5em] hover:bg-brand-green hover:text-white transition-all shadow-xl flex items-center justify-center space-x-3"
                  >
                    <Check size={16} />
                    <span>I've Paid via UPI</span>
                  </button>
                </div>

                <div className="bg-white p-10 border border-brand-green/5 space-y-6 shadow-xl">
                  <div className="flex items-center space-x-3">
                    <MessageCircle className="text-[#25D366]" size={20} />
                    <span className="text-[11px] font-black uppercase tracking-[0.2em]">Order via WhatsApp</span>
                  </div>
                  <p className="text-sm text-brand-green/70 leading-relaxed">
                    {RAZORPAY_KEY_ID
                      ? "Prefer to sort out details before paying? Send this order — items, quantities, and your shipping details — directly to us on WhatsApp instead."
                      : "Online payment isn't set up yet. Tap below to send this order — items, quantities, and your shipping details — directly to us on WhatsApp, and we'll confirm pricing, availability, and delivery with you there."}
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
                        <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
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
