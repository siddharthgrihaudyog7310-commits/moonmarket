import { motion, Variants } from 'motion/react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PRODUCTS, CATEGORIES } from '../data';
import ProductCard from '../components/ProductCard';
import { Product } from '../types';
import Hero3D from '../components/Hero3D';
import ErrorBoundary from '../components/ErrorBoundary';

export default function Home({ onAddToCart }: { onAddToCart: (product: Product) => void }) {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: 'spring', damping: 20, stiffness: 100 }
    }
  };

  return (
    <div className="bg-brand-cream min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <ErrorBoundary>
            <Hero3D />
          </ErrorBoundary>
          <div className="absolute inset-0 bg-black/10 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-brand-cream/100 pointer-events-none" />
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-4 w-full text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="inline-block text-brand-gold font-bold tracking-[0.4em] uppercase text-[9px] md:text-[10px] mb-8 bg-white/10 backdrop-blur-xl px-8 py-3 border border-white/20 whitespace-nowrap">
              Premium Dry Fruit Collection
            </span>
            <h1 className="text-7xl md:text-9xl lg:text-[12rem] font-serif font-medium italic text-white leading-none tracking-tighter drop-shadow-[0_10px_20px_rgba(0,0,0,0.3)] mb-12">
              Moon
            </h1>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-10">
              <Link 
                to="/shop" 
                className="group relative bg-brand-green text-white px-12 py-5 rounded-none font-bold uppercase text-[10px] tracking-[0.4em] transition-all overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.2)] w-full sm:w-auto min-w-[240px] text-center"
              >
                <span className="relative z-10">Shop the Catalog</span>
                <div className="absolute inset-0 bg-brand-gold translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500 ease-out" />
              </Link>
              <button className="text-white hover:text-brand-gold transition-colors font-bold uppercase text-[10px] tracking-[0.4em] px-4 py-5 border-b border-white/20 h-fit hover:border-brand-gold">
                Our Story
              </button>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-brand-green animate-bounce hidden md:block">
          <ChevronDown size={32} strokeWidth={1} />
        </div>
      </section>

      {/* Philosophy Section - Orchard to Table */}
      <section className="bg-white py-24 lg:py-32 relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center">
            <div className="order-2 lg:order-1 space-y-12">
              <div className="space-y-8">
                <div className="flex flex-col space-y-4">
                  <div className="w-12 h-px bg-brand-gold mb-2" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-brand-gold">Our Philosophy</span>
                </div>
              <h3 className="text-5xl md:text-7xl font-serif italic text-brand-green leading-[1.1] font-medium">
                  Orchard to Table Integrity
                </h3>
              </div>
              
              <p className="text-lg md:text-xl text-brand-green/70 leading-relaxed font-normal max-w-lg">
                "We believe in the slow science of quality. Every almond, every date, and every seed is evaluated through our rigorous quality protocol."
              </p>

              <div className="grid grid-cols-2 gap-8 pt-8 border-t border-brand-green/5">
                <div className="space-y-1">
                  <p className="text-4xl md:text-5xl font-serif font-semibold italic text-brand-gold">0%</p>
                  <p className="text-[9px] md:text-[10px] text-brand-green font-bold uppercase tracking-[0.2em] leading-tight opacity-70">Additives & <br/> Syrups</p>
                </div>
                <div className="space-y-1">
                  <p className="text-4xl md:text-5xl font-serif font-semibold italic text-brand-gold">100%</p>
                  <p className="text-[9px] md:text-[10px] text-brand-green font-bold uppercase tracking-[0.2em] leading-tight opacity-70">Direct Path <br/> Sourcing</p>
                </div>
              </div>
            </div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="order-1 lg:order-2 relative"
            >
              <div className="absolute inset-0 border border-brand-gold/20 translate-x-6 translate-y-6 md:translate-x-12 md:translate-y-12 -z-10" />
              <div className="aspect-[4/5] overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000">
                <img 
                  src="https://i.postimg.cc/Z5xkvqYJ/a-premium-lifestyle-photograph-of-a-mode-ZD9WMza-KSb-Wu-F-Px-CWEl-EA-LVk2q-Duu-T2Okoz2j48WACg-sd.jpg" 
                  className="w-full h-full object-cover shadow-2xl"
                  alt="Moon Source"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute bottom-10 left-10 bg-white/90 backdrop-blur-md p-8 shadow-2xl hidden md:block">
                <p className="text-brand-gold text-[10px] font-black uppercase tracking-widest mb-2">Quality Seal</p>
                <p className="text-brand-green font-serif italic text-xl">Moon Certified</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories Horizontal Scroll/Grid Section */}
      <section className="py-24 lg:py-32 bg-brand-cream/30 overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 mb-16 text-center">
          <span className="text-brand-gold text-[10px] font-bold uppercase tracking-[0.4em] block mb-4">The Collection</span>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-serif font-medium italic text-brand-green">Moon Selection</h2>
          <div className="w-16 h-[2px] bg-brand-gold mx-auto mt-8" />
        </div>

        <div className="max-w-[1400px] mx-auto px-6 sm:px-8">
          <div className="flex flex-wrap justify-center gap-10 md:gap-14 lg:gap-20">
            {CATEGORIES.map((cat, idx) => (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="group cursor-pointer"
              >
                <Link to={`/shop?category=${cat.name}`} className="block w-32 md:w-40 lg:w-44">
                  <div className="relative aspect-square overflow-hidden mb-5 bg-white shadow-[0_15px_35px_rgba(0,0,0,0.05)] rounded-full border-2 border-white group-hover:border-brand-gold transition-all duration-700">
                    <img 
                      src={cat.image} 
                      alt={cat.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-all duration-1000"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-brand-green/10 group-hover:bg-transparent transition-colors duration-500" />
                  </div>
                  <h4 className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.3em] text-center text-brand-green/80 group-hover:text-brand-gold transition-colors">
                    {cat.name}
                  </h4>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Elevation Section */}
      <section className="bg-brand-green py-32 lg:py-48 overflow-hidden relative">
        <div className="absolute inset-0 opacity-40">
          <img 
            src="https://i.postimg.cc/Z5xkvqYJ/a-premium-lifestyle-photograph-of-a-mode-ZD9WMza-KSb-Wu-F-Px-CWEl-EA-LVk2q-Duu-T2Okoz2j48WACg-sd.jpg" 
            className="w-full h-full object-cover scale-110"
            alt="The Moon Standard"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-brand-green/80 mix-blend-multiply" />
        </div>
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="order-2 lg:order-1"
            >
               <div className="aspect-[16/9] bg-black/40 backdrop-blur-3xl border border-white/10 relative group overflow-hidden shadow-2xl rounded-sm">
                 <div className="absolute inset-0 bg-gradient-to-br from-brand-gold/20 via-transparent to-brand-green/40 z-10 opacity-30 mix-blend-overlay" />
                 <img 
                    src="https://i.postimg.cc/5NcZmLFv/premium-selection.jpg" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
                    alt="Premium Selection"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-brand-green/10 group-hover:bg-transparent transition-all duration-700 z-10" />
                  
                  {/* Subtle shimmer effect without the redundant text box since the image already contains it */}
                  <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:animate-[shimmer_3s_infinite]" />
                  </div>
               </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="order-1 lg:order-2 space-y-10"
            >
              <div className="space-y-4">
                <span className="text-brand-gold text-[10px] font-black uppercase tracking-[0.8em] block">The Moon Presence</span>
                <h2 className="text-5xl md:text-7xl font-serif italic text-white leading-tight">Elevating Every Culinary Moment</h2>
              </div>
              <p className="text-white/70 text-lg leading-relaxed font-light max-w-lg">
                Witness the obsession behind the selection. Our hand-selection process ensures that only the most pristine, nutrient-dense dry fruits make it into our signature collections. Every piece is a testament to our commitment to excellence.
              </p>
              <Link 
                to="/shop"
                className="group relative inline-block bg-white text-brand-green px-12 py-6 rounded-none font-black uppercase text-[10px] tracking-[0.5em] hover:bg-brand-gold hover:text-white transition-all shadow-2xl"
              >
                Discover the Collection
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Product Grid Section */}
      <section className="bg-white py-24 lg:py-32">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 mb-24 lg:mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-end">
            <div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-block mb-6"
              >
                <span className="text-brand-gold text-[10px] md:text-[11px] uppercase tracking-[0.6em] font-black">Signature Selections</span>
              </motion.div>
              <h2 className="text-4xl md:text-6xl font-serif italic text-brand-green mt-4 leading-tight">Seasonal Jewels</h2>
            </div>
            <div className="lg:pl-20 border-l border-brand-green/5">
              <p className="text-brand-green/60 font-light text-base md:text-lg leading-relaxed">
                Our collectors travel across the sub-continent to secure the first harvest of each season. This carousel represents the absolute peak of current variety.
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-[1400px] mx-auto px-6 sm:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 lg:gap-x-12 gap-y-16 lg:gap-y-24"
          >
            {PRODUCTS.filter(p => p.isBestseller).slice(0, 4).map(product => (
              <motion.div key={product.id} variants={itemVariants}>
                <ProductCard 
                  product={product} 
                  onAddToCart={onAddToCart} 
                />
              </motion.div>
            ))}
          </motion.div>

          <div className="mt-16 text-center">
            <Link to="/shop" className="group inline-flex items-center space-x-8 text-[11px] font-black text-brand-green uppercase tracking-[0.6em] transition-all">
              <span className="group-hover:text-brand-gold transition-colors">Enter the Full Vault</span>
              <div className="flex items-center">
                <div className="w-16 h-[1.5px] bg-brand-gold group-hover:w-24 transition-all duration-700 ease-in-out" />
                <ArrowRight size={18} className="text-brand-gold -ml-1 group-hover:translate-x-2 transition-transform duration-500" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Spices Section - "Authentic Aromatic Masale" */}
      <section className="bg-brand-cream/50 py-24 lg:py-32 overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <div className="space-y-6">
              <span className="text-brand-gold text-[10px] font-black uppercase tracking-[0.6em] block">The Spice Harvest</span>
              <h2 className="text-4xl md:text-6xl font-serif italic text-brand-green leading-tight">Authentic <br className="hidden md:block" /> Aromatic Masale</h2>
            </div>
            <p className="text-brand-green/60 text-lg font-light max-w-sm">
              Discover our obsidian-grade spices, stone-ground to preserve heritage aromas and medicinal potency.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
            {PRODUCTS.filter(p => p.category === 'Spices').slice(0, 6).map((product, idx) => (
              <motion.div 
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="group relative aspect-[4/5] bg-white overflow-hidden mb-8 border border-brand-green/5 shadow-xl">
                  <Link to={`/product/${product.id}`} className="block h-full">
                    <div className="absolute inset-0 bg-brand-green translate-y-full group-hover:translate-y-0 transition-transform duration-700 z-10 opacity-10 pointer-events-none" />
                    <img 
                      src={product.image} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                      alt={product.name}
                      referrerPolicy="no-referrer"
                    />
                  </Link>
                  <div className="absolute bottom-0 left-0 right-0 p-8 z-20 bg-gradient-to-t from-brand-green/90 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                    <button 
                      onClick={() => onAddToCart(product)}
                      className="w-full py-4 bg-brand-gold text-white font-bold uppercase text-[10px] tracking-[0.3em] hover:bg-white hover:text-brand-gold transition-colors"
                    >
                      Add to Harvest
                    </button>
                  </div>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <Link to={`/product/${product.id}`}>
                      <h4 className="text-lg font-sans font-semibold text-brand-green group-hover:text-brand-gold transition-colors leading-tight mb-1 truncate">{product.name}</h4>
                    </Link>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-brand-green/30">{product.category}</p>
                  </div>
                  <p className="text-base font-sans font-bold text-brand-green/60 uppercase tracking-wider">₹{product.price}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-24 text-center">
            <Link 
              to="/shop?category=Spices" 
              className="group relative inline-block bg-brand-green text-white px-16 py-7 rounded-none font-black uppercase text-[10px] tracking-[0.5em] overflow-hidden shadow-2xl"
            >
              <span className="relative z-10">Explore All Masale</span>
              <div className="absolute inset-0 bg-brand-gold translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            </Link>
          </div>
        </div>
      </section>

      {/* Ticker - Minimalist Style */}
      <div className="fixed bottom-0 left-0 w-full h-8 bg-brand-green text-white/80 flex items-center justify-center overflow-hidden z-40 font-bold text-[9px] uppercase tracking-[0.4em] shadow-2xl backdrop-blur-sm">
        <motion.div 
          animate={{ x: [0, -1000] }}
          transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
          className="flex items-center gap-24 whitespace-nowrap px-12"
        >
          {[1,2,3,4].map(i => (
            <div key={i} className="flex items-center gap-24">
              <span>100% Natural</span>
              <span className="opacity-30">/</span>
              <span>Hygienically Packed</span>
              <span className="opacity-30">/</span>
              <span>Pan-India Delivery</span>
              <span className="opacity-30">/</span>
              <span>Since 1996</span>
              <span className="opacity-30">/</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
