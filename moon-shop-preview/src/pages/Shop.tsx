import { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { ChevronDown, Check } from 'lucide-react';
import { PRODUCTS, CATEGORIES } from '../data';
import ProductCard from '../components/ProductCard';
import { Product } from '../types';
import { useSearchParams } from 'react-router-dom';

export default function Shop({ onAddToCart }: { onAddToCart: (product: Product) => void }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get('category') || 'All';
  const [priceRange, setPriceRange] = useState([0, 600]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  
  const sizes = ['100g', '250g', '500g'];

  const toggleSize = (size: string) => {
    setSelectedSizes(prev => 
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    );
  };

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(product => {
      const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
      const matchesPrice = product.price <= priceRange[1];
      const matchesSize = selectedSizes.length === 0 || product.weightOptions.some(s => selectedSizes.includes(s));
      return matchesCategory && matchesPrice && matchesSize;
    });
  }, [activeCategory, priceRange, selectedSizes]);

  return (
    <div className="bg-brand-cream min-h-screen pt-32 pb-24">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
        {/* Top bar */}
        <div className="flex flex-col md:flex-row justify-between items-end md:items-center mb-16 pb-10 border-b border-brand-green/10">
          <div className="space-y-4 mb-8 md:mb-0">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-px bg-brand-gold opacity-50" />
              <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-brand-gold">Curated Collection</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-serif italic text-brand-green leading-none tracking-tight">Artisanal Freshness <br className="hidden md:block" /> Catalog</h1>
          </div>
          
          <div className="flex flex-wrap items-center gap-8 text-[10px] font-bold uppercase tracking-[0.2em] text-brand-green/40">
            <div className="flex items-center space-x-2">
              <span className="text-brand-gold font-bold">●</span>
              <span>Inventory Status: Active</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-brand-gold font-bold">●</span>
              <span>Harvest Count: {filteredProducts.length}</span>
            </div>
            <div className="relative group">
              <button className="flex items-center space-x-4 transition-colors text-brand-green hover:text-brand-gold py-1 border-b border-brand-green/10">
                <span>Refine Selection</span>
                <ChevronDown size={12} strokeWidth={3} />
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          {/* Sidebar Filters */}
          <aside className="lg:w-72 shrink-0 space-y-12">
            {/* Category Navigation */}
            <div>
              <div className="mb-6 pb-5 border-b border-brand-green/5">
                <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-brand-gold block mb-1">Navigation</span>
                <h3 className="text-3xl font-serif italic text-brand-green tracking-tight">Collections</h3>
              </div>
              <div className="space-y-3">
                <button 
                  onClick={() => setSearchParams({})}
                  className={`group w-full text-left flex items-center space-x-6 py-1 transition-all ${activeCategory === 'All' ? 'text-brand-green' : 'text-brand-green/40 hover:text-brand-green'}`}
                >
                  <div className="relative flex items-center justify-center w-4 h-4">
                    <div className={`absolute inset-0 rounded-full border border-brand-gold/30 transition-all duration-700 ${activeCategory === 'All' ? 'scale-125 opacity-100' : 'scale-75 opacity-0'}`} />
                    <div className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${activeCategory === 'All' ? 'bg-brand-gold scale-125' : 'bg-brand-green/10 group-hover:bg-brand-gold/50'}`} />
                  </div>
                  <span className={`text-[12px] font-bold uppercase tracking-[0.2em] transition-all ${activeCategory === 'All' ? 'translate-x-1' : ''}`}>All Offerings</span>
                </button>
                {CATEGORIES.map(cat => (
                  <button 
                    key={cat.name}
                    onClick={() => setSearchParams({ category: cat.name })}
                    className={`group w-full text-left flex items-center space-x-6 py-1 transition-all ${activeCategory === cat.name ? 'text-brand-green' : 'text-brand-green/40 hover:text-brand-green'}`}
                  >
                    <div className="relative flex items-center justify-center w-4 h-4">
                      <div className={`absolute inset-0 rounded-full border border-brand-gold/30 transition-all duration-700 ${activeCategory === cat.name ? 'scale-125 opacity-100' : 'scale-75 opacity-0'}`} />
                      <div className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${activeCategory === cat.name ? 'bg-brand-gold scale-125' : 'bg-brand-green/10 group-hover:bg-brand-gold/50'}`} />
                    </div>
                    <span className={`text-[12px] font-bold uppercase tracking-[0.2em] transition-all ${activeCategory === cat.name ? 'translate-x-1' : ''}`}>{cat.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div>
              <div className="mb-6 pb-5 border-b border-brand-green/5">
                <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-brand-gold block mb-1">Economy</span>
                <h3 className="text-3xl font-serif italic text-brand-green tracking-tight">Investment</h3>
              </div>
              <div className="space-y-8">
                <div className="relative pt-4">
                  <input 
                    type="range" 
                    min="0" 
                    max="600" 
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                    style={{
                      background: `linear-gradient(to right, #B58452 ${(priceRange[1] / 600) * 100}%, rgba(27, 48, 34, 0.05) ${(priceRange[1] / 600) * 100}%)`
                    }}
                    className="w-full h-[1px] appearance-none cursor-pointer accent-brand-gold [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-brand-gold [&::-webkit-slider-thumb]:shadow-[0_0_0_6px_rgba(181,132,82,0.1)] [&::-webkit-slider-thumb]:hover:shadow-[0_0_0_10px_rgba(181,132,82,0.15)] transition-all"
                  />
                </div>
                <div className="flex justify-between items-end">
                  <div className="space-y-1">
                    <span className="text-[8px] font-black uppercase tracking-[0.2em] text-brand-green/20">Up To</span>
                    <div className="flex items-baseline space-x-1">
                      <span className="text-[14px] font-bold text-brand-green/40">₹</span>
                      <span className="text-4xl font-serif font-medium text-brand-green tabular-nums">{priceRange[1]}</span>
                    </div>
                  </div>
                  <div className="w-10 h-px bg-brand-green/5 mb-2" />
                </div>
              </div>
            </div>

            {/* Size Filter */}
            <div>
              <div className="mb-6 pb-5 border-b border-brand-green/5">
                <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-brand-gold block mb-1">Metrics</span>
                <h3 className="text-3xl font-serif italic text-brand-green tracking-tight">Net Weight</h3>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {sizes.map(size => (
                  <button 
                    key={size}
                    onClick={() => toggleSize(size)}
                    className={`h-11 flex items-center justify-center text-[10px] font-bold uppercase tracking-widest border transition-all duration-700 ${
                      selectedSizes.includes(size) ? 'bg-brand-green border-brand-green text-white shadow-xl shadow-brand-green/20' : 'bg-white border-brand-green/5 text-brand-green/40 hover:border-brand-gold/30 hover:text-brand-gold'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-grow">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 lg:gap-x-12 gap-y-16 lg:gap-y-24">
                {filteredProducts.map(product => (
                  <motion.div 
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    key={product.id}
                  >
                    <ProductCard 
                      product={product} 
                      onAddToCart={onAddToCart} 
                    />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="bg-white border border-brand-green/5 p-20 text-center">
                <p className="text-brand-green/40 font-serif italic text-2xl">No items match your refined selection.</p>
                <button 
                  onClick={() => {
                    setPriceRange([0, 600]);
                    setSelectedSizes([]);
                    setSearchParams({});
                  }}
                  className="mt-8 text-brand-gold text-[10px] font-black uppercase tracking-widest border-b border-brand-gold/20 pb-1"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
