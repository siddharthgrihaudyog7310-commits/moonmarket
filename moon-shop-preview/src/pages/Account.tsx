import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Loader2, LogOut, Package } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabaseClient';

interface Profile {
  full_name: string | null;
  phone: string | null;
  address: string | null;
  city: string | null;
  postal_code: string | null;
}

interface OrderRow {
  id: string;
  created_at: string;
  status: string;
  payment_method: string;
  subtotal: number;
  items: { id: string; name: string; price: number; quantity: number; selectedWeight: string }[];
}

const emptyProfile: Profile = { full_name: '', phone: '', address: '', city: '', postal_code: '' };

function formatOrderRef(id: string) {
  return id.replace(/-/g, '').slice(0, 8).toUpperCase();
}

const STATUS_LABELS: Record<string, string> = {
  paid: 'Paid',
  pending_payment: 'Payment Pending',
  pending_whatsapp: 'Sent via WhatsApp',
  pending_upi_verification: 'UPI — Verifying',
  failed: 'Failed',
};

export default function Account() {
  const { user, isLoading, signOut } = useAuth();
  const [profile, setProfile] = useState<Profile>(emptyProfile);
  const [orders, setOrders] = useState<OrderRow[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!user || !supabase) return;

    Promise.all([
      supabase.from('profiles').select('full_name, phone, address, city, postal_code').eq('id', user.id).maybeSingle(),
      supabase
        .from('orders')
        .select('id, created_at, status, payment_method, subtotal, items')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false }),
    ]).then(([profileRes, ordersRes]) => {
      if (profileRes.data) setProfile({ ...emptyProfile, ...profileRes.data });
      if (ordersRes.data) setOrders(ordersRes.data as OrderRow[]);
      setIsLoadingData(false);
    });
  }, [user]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-brand-cream flex items-center justify-center pt-32">
        <Loader2 size={24} className="animate-spin text-brand-gold" />
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase) return;
    setIsSaving(true);
    setSaveMessage(null);

    const { error } = await supabase.from('profiles').upsert({ id: user.id, ...profile });

    setSaveMessage(error ? 'Could not save — please try again.' : 'Saved!');
    setIsSaving(false);
    setTimeout(() => setSaveMessage(null), 3000);
  };

  return (
    <div className="min-h-screen bg-brand-cream pt-32 pb-24 px-6 sm:px-8">
      <div className="max-w-[1000px] mx-auto space-y-16">
        <div className="flex items-center justify-between">
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-px bg-brand-gold opacity-50" />
              <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-brand-gold">My Account</span>
            </div>
            <h1 className="text-4xl font-serif italic text-brand-green tracking-tight">{user.email}</h1>
          </div>
          <button
            onClick={signOut}
            className="flex items-center space-x-2 text-brand-green/50 hover:text-brand-green transition-colors text-[10px] font-bold uppercase tracking-widest"
          >
            <LogOut size={14} />
            <span>Sign Out</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Saved Address */}
          <div className="bg-white p-10 border border-brand-green/5 shadow-xl space-y-6 h-fit">
            <h2 className="text-[11px] font-black uppercase tracking-[0.3em] text-brand-green pb-4 border-b border-brand-green/5">
              Saved Details
            </h2>
            <form onSubmit={handleSaveProfile} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-[0.1em] text-brand-green/50">Full Name</label>
                <input
                  type="text"
                  value={profile.full_name ?? ''}
                  onChange={(e) => setProfile((p) => ({ ...p, full_name: e.target.value }))}
                  className="w-full bg-white border border-brand-green/10 px-6 py-4 text-sm font-bold tracking-tight outline-none focus:border-brand-gold transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-[0.1em] text-brand-green/50">Phone</label>
                <input
                  type="tel"
                  value={profile.phone ?? ''}
                  onChange={(e) => setProfile((p) => ({ ...p, phone: e.target.value }))}
                  className="w-full bg-white border border-brand-green/10 px-6 py-4 text-sm font-bold tracking-tight outline-none focus:border-brand-gold transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-[0.1em] text-brand-green/50">Address</label>
                <textarea
                  value={profile.address ?? ''}
                  onChange={(e) => setProfile((p) => ({ ...p, address: e.target.value }))}
                  className="w-full bg-white border border-brand-green/10 px-6 py-4 text-sm font-bold tracking-tight outline-none focus:border-brand-gold transition-colors h-24 resize-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-[0.1em] text-brand-green/50">City</label>
                  <input
                    type="text"
                    value={profile.city ?? ''}
                    onChange={(e) => setProfile((p) => ({ ...p, city: e.target.value }))}
                    className="w-full bg-white border border-brand-green/10 px-6 py-4 text-sm font-bold tracking-tight outline-none focus:border-brand-gold transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-[0.1em] text-brand-green/50">Postal Code</label>
                  <input
                    type="text"
                    value={profile.postal_code ?? ''}
                    onChange={(e) => setProfile((p) => ({ ...p, postal_code: e.target.value }))}
                    className="w-full bg-white border border-brand-green/10 px-6 py-4 text-sm font-bold tracking-tight outline-none focus:border-brand-gold transition-colors"
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={isSaving}
                className="w-full bg-brand-green text-white px-12 py-5 font-black uppercase text-[10px] tracking-[0.5em] hover:bg-brand-gold transition-all shadow-xl flex items-center justify-center space-x-3 disabled:opacity-60"
              >
                {isSaving && <Loader2 size={16} className="animate-spin" />}
                <span>Save Details</span>
              </button>
              {saveMessage && <p className="text-xs font-bold text-brand-green/70 text-center">{saveMessage}</p>}
            </form>
          </div>

          {/* Order History */}
          <div className="bg-white p-10 border border-brand-green/5 shadow-xl space-y-6 h-fit">
            <h2 className="text-[11px] font-black uppercase tracking-[0.3em] text-brand-green pb-4 border-b border-brand-green/5">
              Order History
            </h2>
            {isLoadingData ? (
              <div className="flex justify-center py-12">
                <Loader2 size={20} className="animate-spin text-brand-gold" />
              </div>
            ) : orders.length === 0 ? (
              <div className="text-center py-12 space-y-3">
                <Package size={32} className="text-brand-green/20 mx-auto" strokeWidth={1} />
                <p className="text-sm text-brand-green/50">No orders placed through your account yet.</p>
              </div>
            ) : (
              <div className="space-y-6 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                {orders.map((order) => (
                  <div key={order.id} className="border border-brand-green/5 p-6 space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-xs font-black uppercase tracking-widest text-brand-gold">#{formatOrderRef(order.id)}</p>
                        <p className="text-[10px] text-brand-green/40 font-medium mt-1">
                          {new Date(order.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </p>
                      </div>
                      <span className="text-[9px] font-black uppercase tracking-widest bg-brand-cream px-3 py-1.5 text-brand-green/60">
                        {STATUS_LABELS[order.status] ?? order.status}
                      </span>
                    </div>
                    <div className="space-y-1 pt-2 border-t border-brand-green/5">
                      {order.items.map((item, i) => (
                        <p key={i} className="text-xs text-brand-green/60">
                          {item.name} ({item.selectedWeight}) × {item.quantity}
                        </p>
                      ))}
                    </div>
                    <p className="text-sm font-bold text-brand-green pt-2 border-t border-brand-green/5">₹{order.subtotal}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
