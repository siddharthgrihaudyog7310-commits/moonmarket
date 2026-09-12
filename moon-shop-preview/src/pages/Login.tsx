import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { isSupabaseConfigured } from '../lib/supabaseClient';
import InfoPage from '../components/InfoPage';

export default function Login() {
  const navigate = useNavigate();
  const { signIn, signUp } = useAuth();
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isSupabaseConfigured) {
    return (
      <InfoPage title="Accounts — Coming Soon" subtitle="Assistance">
        <p>
          We don't have customer accounts set up on the website yet. For now, every order is placed and tracked
          personally over WhatsApp — no password required.
        </p>
        <a
          href="https://wa.me/917054578781"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-brand-green text-white px-10 py-4 font-bold uppercase text-[10px] tracking-[0.4em] hover:bg-brand-gold transition-colors mt-2"
        >
          Message Us on WhatsApp
        </a>
      </InfoPage>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setInfo(null);
    setIsSubmitting(true);

    const { error } = mode === 'signin' ? await signIn(email, password) : await signUp(email, password);

    if (error) {
      setError(error);
      setIsSubmitting(false);
      return;
    }

    if (mode === 'signup') {
      setInfo('Account created! Check your email to confirm your address, then sign in.');
      setMode('signin');
      setIsSubmitting(false);
      return;
    }

    navigate('/account');
  };

  return (
    <div className="min-h-screen bg-brand-cream flex items-center justify-center p-6 pt-32 pb-24">
      <div className="max-w-md w-full bg-white p-12 shadow-2xl border border-brand-green/5">
        <div className="text-center mb-10 space-y-4">
          <div className="flex items-center justify-center space-x-4">
            <div className="w-10 h-px bg-brand-gold opacity-50" />
            <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-brand-gold">Moon Spices & Groceries</span>
          </div>
          <h1 className="text-4xl font-serif italic text-brand-green tracking-tight">
            {mode === 'signin' ? 'Welcome Back' : 'Create Account'}
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-[0.1em] text-brand-green/50">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white border border-brand-green/10 px-6 py-4 text-sm font-bold tracking-tight outline-none focus:border-brand-gold transition-colors"
              placeholder="you@example.com"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-[0.1em] text-brand-green/50">Password</label>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white border border-brand-green/10 px-6 py-4 text-sm font-bold tracking-tight outline-none focus:border-brand-gold transition-colors"
              placeholder="••••••••"
            />
          </div>

          {error && <p className="text-xs font-bold text-red-600/80 leading-relaxed">{error}</p>}
          {info && <p className="text-xs font-bold text-brand-green/80 leading-relaxed">{info}</p>}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-brand-green text-white px-12 py-5 font-black uppercase text-[10px] tracking-[0.5em] hover:bg-brand-gold transition-all shadow-xl flex items-center justify-center space-x-3 disabled:opacity-60"
          >
            {isSubmitting && <Loader2 size={16} className="animate-spin" />}
            <span>{mode === 'signin' ? 'Sign In' : 'Create Account'}</span>
          </button>
        </form>

        <div className="mt-8 text-center">
          <button
            onClick={() => {
              setMode(mode === 'signin' ? 'signup' : 'signin');
              setError(null);
              setInfo(null);
            }}
            className="text-[10px] font-bold uppercase tracking-widest text-brand-green/50 hover:text-brand-gold transition-colors"
          >
            {mode === 'signin' ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
          </button>
        </div>

        <div className="mt-6 pt-6 border-t border-brand-green/5 text-center">
          <Link to="/shop" className="text-[10px] font-bold uppercase tracking-widest text-brand-green/30 hover:text-brand-green transition-colors">
            Continue shopping without an account
          </Link>
        </div>
      </div>
    </div>
  );
}
