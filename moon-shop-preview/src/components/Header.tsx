import { useState } from 'react';
import { ShoppingCart, Heart, Search, Menu, X, User, ChevronDown, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';

export default function Header({ cartCount, wishlistCount, onOpenCart }: { cartCount: number, wishlistCount: number, onOpenCart: () => void }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const location = useLocation();

  const categories = {
    'Dry Fruits': ['Premium Almonds', 'Whole Cashews', 'Golden Raisins'],
    'Spices': ['Turmeric Powder', 'Red Chilli Powder', 'Coriander Powder', 'Amchur Powder'],
    'Dry Dates': ['Moon Dry Fruits Dry Dates'],
    'Speciality Flours': ['Kuttu Atta', 'Singhara Atta'],
    'Seeds': ['Chia Seeds', 'Pumpkin Seeds', 'Flax Seeds', 'Black Sesame Seeds'],
  };

  const navLinks = [
    { name: 'Shop Categories', path: '/shop', hasMega: true },
    { name: 'New Launches', path: '/shop' },
    { name: 'Combos', path: '/shop' },
  ];

  return (
    <header 
      className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-brand-green/10 text-brand-green shadow-sm shadow-brand-green/5"
      onMouseLeave={() => setIsMegaMenuOpen(false)}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <div className="relative mix-blend-multiply transition-all duration-500 group-hover:scale-105">
              <img
                src="/logo-full.png"
                alt="Moon Spices & Groceries Logo"
                className="h-14 md:h-16 w-auto object-contain"
              />
            </div>
          </Link>

          {/* Nav Links */}
          <nav className="hidden lg:flex space-x-12 items-center h-full">
            {navLinks.map((link) => (
              <div 
                key={link.name}
                className="h-full flex items-center"
                onMouseEnter={() => link.hasMega && setIsMegaMenuOpen(true)}
              >
                <Link 
                  to={link.path}
                  className="text-[10px] uppercase font-bold tracking-[0.25em] text-brand-green/50 hover:text-brand-green transition-all relative group py-8"
                >
                  {link.name}
                  {link.hasMega && <ChevronDown size={11} className="inline-block ml-1 opacity-30 group-hover:opacity-100 transition-opacity" />}
                  <span className="absolute bottom-[28px] left-0 w-0 h-[1.5px] bg-brand-gold transition-all duration-500 group-hover:w-full"></span>
                </Link>
              </div>
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <div className="hidden md:flex items-center bg-brand-green/5 px-4 py-2 rounded-lg border border-brand-green/10 w-48 lg:w-64 focus-within:border-brand-gold transition-all">
              <Search size={14} className="text-brand-green/40 mr-2" />
              <input 
                type="text" 
                placeholder="SEARCH COLLECTION" 
                className="bg-transparent border-none text-[10px] font-bold tracking-widest w-full focus:outline-none placeholder:text-brand-green/20 text-brand-green uppercase"
              />
            </div>

            <div className="flex items-center space-x-1 sm:space-x-2">
              <Link to="/login" className="p-2 hover:text-brand-gold transition-colors">
                <User size={18} strokeWidth={2} />
              </Link>
              <button 
                onClick={onOpenCart}
                className="p-2 hover:text-brand-gold transition-colors relative"
                id="header-cart-button"
              >
                <ShoppingCart size={18} strokeWidth={2} />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 h-4 w-4 bg-brand-gold text-white text-[9px] rounded-full flex items-center justify-center font-black">
                    {cartCount}
                  </span>
                )}
              </button>
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 text-brand-green"
              >
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMegaMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-20 left-0 w-full bg-white border-b border-brand-green/10 p-12 z-40 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)]"
          >
            <div className="max-w-[1400px] mx-auto flex gap-12">
              <div className="grid grid-cols-5 gap-12 flex-grow">
                {Object.entries(categories).map(([category, items]) => (
                  <div key={category}>
                    <Link 
                      to={`/shop?category=${category}`}
                      onClick={() => setIsMegaMenuOpen(false)}
                      className="text-brand-gold text-[10px] font-black uppercase tracking-[0.4em] mb-6 border-b border-brand-green/5 pb-2 block hover:text-brand-green transition-colors"
                    >
                      {category}
                    </Link>
                    <ul className="space-y-4">
                      {items.map(item => (
                        <li key={item}>
                          <Link 
                            to={`/shop?category=${category}`}
                            onClick={() => setIsMegaMenuOpen(false)}
                            className="text-[11px] font-bold text-brand-green/50 hover:text-brand-green transition-colors block uppercase tracking-widest"
                          >
                            {item}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Mega Menu Footer Accent */}
            <div className="mt-12 pt-8 border-t border-brand-green/5 flex justify-between items-center">
              <p className="text-[8px] text-brand-green/30 uppercase font-bold tracking-[0.2em]">New Season Harvest Arriving Weekly</p>
              <Link to="/shop" className="text-[10px] text-brand-gold font-bold uppercase tracking-widest flex items-center">
                Explore Full Grid <ArrowRight size={12} className="ml-2" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="lg:hidden fixed inset-0 top-20 bg-brand-green z-40 p-6 flex flex-col space-y-6 text-white"
          >
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path} 
                onClick={() => setIsMenuOpen(false)}
                className="text-lg font-medium border-b border-white/10 pb-2"
              >
                {link.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
