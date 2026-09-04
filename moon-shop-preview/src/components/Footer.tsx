import { Link } from 'react-router-dom';
import { Instagram, MessageCircle, ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-brand-green pt-32 pb-20 text-brand-cream overflow-hidden">
      {/* Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/black-paper.png')]" />
      
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 mb-24">
          
          {/* Brand Identity */}
          <div className="lg:col-span-4 space-y-12">
            <Link to="/" className="inline-block group">
              <div className="relative">
                <div className="absolute inset-0 bg-brand-gold/20 blur-2xl rounded-full scale-0 group-hover:scale-100 transition-transform duration-700" />
                <div className="relative bg-brand-cream p-1.5 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.3)] border-4 border-brand-gold/10 overflow-hidden w-28 h-28 flex items-center justify-center transition-all duration-500 group-hover:border-brand-gold/40">
                  <img
                    src="/logo-full.png"
                    alt="Moon Spices & Groceries Logo"
                    className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
              </div>
            </Link>
            <div className="space-y-6">
              <p className="text-brand-cream/60 text-xs md:text-[13px] leading-relaxed max-w-sm font-medium uppercase tracking-[0.2em]">
                Cultivating excellence since 1996. Sifting through the world's harvest to bring you the pinnacle of artisanal dry fruits and spices.
              </p>
              <div className="flex items-center gap-4 text-brand-gold">
                <div className="h-px w-8 bg-brand-gold/40" />
                <span className="text-[10px] font-bold uppercase tracking-[0.4em]">The New Standard</span>
              </div>
            </div>
          </div>
          
          {/* Links Grid */}
          <div className="lg:col-span-1 hidden lg:block" /> {/* Spacer */}
          
          <div className="lg:col-span-2 space-y-10">
            <h4 className="text-[11px] font-black uppercase tracking-[0.5em] text-brand-gold/80 flex items-center gap-3">
              <div className="w-1 h-1 bg-brand-gold rounded-full" />
              Collections
            </h4>
            <ul className="space-y-4">
              {[
                { name: 'Current Harvest', path: '/shop' },
                { name: 'Our Provenance', path: '/about' },
                { name: 'Bespoke Logistics', path: '/track' },
                { name: 'Site Directory', path: '/sitemap' }
              ].map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path} 
                    className="group flex items-center justify-between text-[11px] font-bold tracking-[0.25em] text-brand-cream/40 uppercase hover:text-brand-gold transition-all duration-300"
                  >
                    <span>{link.name}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2 space-y-10">
            <h4 className="text-[11px] font-black uppercase tracking-[0.5em] text-brand-gold/80 flex items-center gap-3">
              <div className="w-1 h-1 bg-brand-gold rounded-full" />
              Assistance
            </h4>
            <ul className="space-y-4">
              {[
                { name: 'Connect with Concierge', path: '/contact' },
                { name: 'Quality Warranties', path: '/terms' },
                { name: 'Privacy Protocol', path: '/privacy' },
                { name: 'Shipping Inquiry', path: '/shipping' }
              ].map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path} 
                    className="group flex items-center justify-between text-[11px] font-bold tracking-[0.25em] text-brand-cream/40 uppercase hover:text-brand-gold transition-all duration-300"
                  >
                    <span>{link.name}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3 lg:pl-12 space-y-12">
            <h4 className="text-[11px] font-black uppercase tracking-[0.5em] text-brand-gold/80 flex items-center gap-3">
              <div className="w-1 h-1 bg-brand-gold rounded-full" />
              The Circle
            </h4>
            <div className="space-y-8">
              <p className="text-[10px] text-brand-cream/40 font-bold uppercase tracking-[0.2em] leading-relaxed">
                Join our collective for first access to rare harvests and limited editions.
              </p>
              
              <div className="relative group">
                <input 
                  type="email" 
                  placeholder="EMAIL ADDRESS" 
                  className="w-full bg-transparent border-b border-brand-cream/10 py-4 text-[10px] font-bold tracking-[0.3em] uppercase focus:outline-none focus:border-brand-gold transition-colors placeholder:text-brand-cream/10"
                />
                <button className="absolute right-0 top-1/2 -translate-y-1/2 text-brand-gold hover:text-brand-cream transition-colors">
                  <ArrowUpRight size={16} />
                </button>
              </div>

              <div className="flex space-x-6">
                {[
                  { icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/moon_spices_groceries' },
                  { icon: MessageCircle, label: 'WhatsApp', href: 'https://wa.me/917054578781' },
                ].map(({ icon: Icon, label, href }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -4 }}
                    className="group relative flex items-center justify-center transition-all duration-500"
                  >
                    <Icon className="w-4 h-4 text-brand-cream/40 group-hover:text-brand-gold transition-colors duration-500" strokeWidth={1.5} />
                    <span className="sr-only">{label}</span>
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer Bottom */}
        <div className="pt-12 border-t border-brand-cream/5 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12">
            <p className="text-[10px] text-brand-cream/20 font-black tracking-[0.4em] uppercase">
              © {currentYear} MOON. NATURALLY PURIFIED.
            </p>
            <div className="h-px w-8 bg-brand-cream/10 hidden md:block" />
            <Link to="/sitemap" className="text-[9px] text-brand-cream/20 font-black tracking-[0.4em] uppercase hover:text-brand-gold transition-colors">
              Sitemap
            </Link>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-[10px] text-brand-gold font-black uppercase tracking-[0.4em] italic shadow-orange-900/10">
              From the Orchard to the Apex
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
