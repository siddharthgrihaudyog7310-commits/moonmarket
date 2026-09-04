import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Star, ShoppingBag, ShieldCheck, Truck, RefreshCcw } from 'lucide-react';
import { PRODUCTS } from '../data';
import { useState } from 'react';

export default function ProductDetails({ onAddToCart }: { onAddToCart: (product: any, weight: string) => void }) {
  const { id } = useParams<{ id: string }>();
  const product = PRODUCTS.find((p) => p.id === id);
  const [selectedWeight, setSelectedWeight] = useState(product?.weightOptions[0] || '250g');

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-4xl font-serif italic text-brand-green mb-6">Discovery Failed</h2>
        <p className="text-brand-green/60 mb-8 max-w-xs">The harvest you're looking for seems to have vanished from our orchards.</p>
        <Link to="/shop" className="bg-brand-green text-white px-8 py-4 rounded-none font-bold uppercase text-[10px] tracking-[0.3em]">
          Return to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 bg-white">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8">
        <Link 
          to="/shop" 
          className="inline-flex items-center text-brand-green/40 hover:text-brand-gold transition-colors text-[10px] font-black uppercase tracking-[0.4em] mb-12"
        >
          <ArrowLeft size={14} className="mr-3" /> Back to Catalog
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Image Gallery Mockup */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="aspect-square bg-brand-cream/30 border border-brand-green/5 overflow-hidden flex items-center justify-center group relative">
              {product.isBestseller && (
                <span className="absolute top-8 left-8 z-10 bg-brand-gold text-white px-4 py-2 text-[9px] font-black uppercase tracking-widest">
                  Bestseller
                </span>
              )}
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover grayscale-[0.2] transition-all duration-1000 group-hover:scale-105 group-hover:grayscale-0"
              />
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-12"
          >
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="flex text-brand-gold">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} strokeWidth={3} />
                  ))}
                </div>
                {product.reviewsCount != null && (
                  <span className="text-[10px] font-bold uppercase tracking-widest text-brand-green/40">{product.reviewsCount} Appraisals</span>
                )}
              </div>
              
              <h1 className="text-5xl md:text-7xl font-serif italic text-brand-green leading-tight">{product.name}</h1>
              
              <div className="flex items-baseline space-x-6">
                <span className="text-4xl font-serif text-brand-gold italic">₹{product.price}</span>
                {product.originalPrice && (
                  <span className="text-xl text-brand-green/20 line-through">₹{product.originalPrice}</span>
                )}
                <span className="text-xs font-bold text-brand-green/40 uppercase tracking-widest">Per {selectedWeight}</span>
              </div>

              <p className="text-brand-green/60 text-lg font-light leading-relaxed max-w-lg">
                {product.description}
              </p>
            </div>

            {/* Selection */}
            <div className="space-y-10">
              <div className="space-y-4">
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-green/40 block">Select Harvest Size</span>
                <div className="flex flex-wrap gap-3">
                  {product.weightOptions.map((weight) => (
                    <button
                      key={weight}
                      onClick={() => setSelectedWeight(weight)}
                      className={`px-6 py-3 text-[10px] font-bold uppercase tracking-widest transition-all duration-300 border ${
                        selectedWeight === weight 
                          ? 'bg-brand-green text-white border-brand-green translate-y-[-2px] shadow-lg' 
                          : 'bg-white text-brand-green border-brand-green/10 hover:border-brand-gold hover:text-brand-gold'
                      }`}
                    >
                      {weight}
                    </button>
                  ))}
                </div>
              </div>

              {product.minimumOrderQuantity && (
                <div className="p-6 bg-brand-gold/5 border border-brand-gold/10 inline-block">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-gold">
                    ⚡ Minimum Order Quantity: {product.minimumOrderQuantity}
                  </p>
                </div>
              )}

              <button 
                onClick={() => onAddToCart(product, selectedWeight)}
                className="group relative w-full lg:w-auto bg-brand-green text-white px-16 py-7 font-black uppercase text-[10px] tracking-[0.5em] overflow-hidden shadow-2xl flex items-center justify-center space-x-4"
              >
                <div className="absolute inset-0 bg-brand-gold translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                <ShoppingBag size={18} className="relative z-10" />
                <span className="relative z-10">Add to Harvest</span>
              </button>
            </div>

            {/* Quick Benefits */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-12 border-t border-brand-green/5">
              {[
                { icon: ShieldCheck, title: 'Obsessive Quality', desc: 'Hand-inspected harvest' },
                { icon: Truck, title: 'Direct Transit', desc: 'Farm to your table' },
                { icon: RefreshCcw, title: 'Purity Promise', desc: 'No additives, ever' }
              ].map((item, i) => (
                <div key={i} className="space-y-2">
                  <item.icon size={20} className="text-brand-gold" strokeWidth={1.5} />
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-brand-green">{item.title}</h4>
                  <p className="text-[10px] font-medium text-brand-green/40">{item.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Specifications & Details Section */}
        <section className="mt-32 pt-24 border-t border-brand-green/5">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            <div className="lg:col-span-4 space-y-12">
              {product.nutrition && (
                <div className="space-y-8">
                  <h3 className="text-2xl font-serif italic text-brand-green border-b border-brand-green/5 pb-4 mb-8">Nutritional Profile</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(product.nutrition).map(([key, val]) => (
                      <div key={key} className="bg-brand-cream/40 p-6 border border-brand-green/5 group hover:border-brand-gold/30 transition-colors">
                        <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-brand-green/30 mb-2">{key}</p>
                        <p className="text-base font-sans font-bold text-brand-green tracking-tight">{val as string}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {product.additionalInfo && (
                <div className="space-y-8">
                  <h3 className="text-2xl font-serif italic text-brand-green border-b border-brand-green/5 pb-4 mb-8">Product Essence</h3>
                  <ul className="space-y-6">
                    {product.additionalInfo.map((info, i) => (
                      <li key={i} className="flex items-start space-x-4 text-brand-green/70 text-[13px] font-sans leading-relaxed group">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-gold mt-1.5 shrink-0 transition-transform group-hover:scale-125" />
                        <span className="font-medium">{info}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {product.specifications && (
              <div className="lg:col-span-8 space-y-12">
                <div className="space-y-8">
                  <div className="flex items-center justify-between border-b border-brand-green/5 pb-4 mb-8">
                    <h3 className="text-2xl font-serif italic text-brand-green">Technical Specifications</h3>
                    <div className="flex space-x-8 text-[9px] font-black uppercase tracking-[0.4em] text-brand-green/30">
                      <div className="flex items-center"><div className="w-2 h-2 rounded-full bg-brand-gold mr-2" /> Verified Harvest</div>
                      <div className="flex items-center"><div className="w-2 h-2 rounded-full bg-brand-gold mr-2" /> Lab Tested</div>
                    </div>
                  </div>
                  
                  <div className="overflow-hidden border border-brand-green/10 bg-white">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-brand-green/[0.03] border-b border-brand-green/10">
                          <th className="px-10 py-6 text-[9px] font-black uppercase tracking-[0.4em] text-brand-green/40 w-1/3">Standard Parameter</th>
                          <th className="px-10 py-6 text-[9px] font-black uppercase tracking-[0.4em] text-brand-green/40">Moon Observation</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-brand-green/5">
                        {Object.entries(product.specifications).map(([key, val]) => (
                          <tr key={key} className="group hover:bg-brand-gold/[0.02] transition-colors">
                            <td className="px-10 py-6 text-[10px] font-bold text-brand-green/60 uppercase tracking-[0.25em]">{key}</td>
                            <td className="px-10 py-6 text-[13px] font-sans font-semibold text-brand-green tracking-tight">{val}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {(product.productionCapacity || product.deliveryTime) && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
                    <div className="flex items-center p-8 bg-brand-green text-white space-x-6 group">
                      <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-brand-gold flex-shrink-0 transition-transform group-hover:scale-110">
                        <Truck size={24} />
                      </div>
                      <div>
                        <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-white/40 mb-1">Logistics Estimate</p>
                        <p className="text-xl font-sans font-bold tracking-tight">Dispatched in {product.deliveryTime}</p>
                      </div>
                    </div>
                    <div className="flex items-center p-8 bg-brand-gold text-white space-x-6 group">
                      <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white flex-shrink-0 transition-transform group-hover:scale-110">
                        <ShoppingBag size={24} />
                      </div>
                      <div>
                        <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-white/40 mb-1">Production Reserve</p>
                        <p className="text-xl font-sans font-bold tracking-tight">{product.productionCapacity} Stocked</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        {/* Suggestion Section */}
        <section className="mt-48">
          <div className="text-center mb-16 space-y-4">
            <span className="text-brand-gold text-[10px] font-black uppercase tracking-[0.6em] block">Complementary Selection</span>
            <h2 className="text-5xl font-serif italic text-brand-green">Curated For You</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {PRODUCTS.filter(p => p.id !== product.id && p.category === product.category).slice(0, 4).map((p) => (
              <Link key={p.id} to={`/product/${p.id}`} className="group">
                <div className="aspect-square bg-brand-cream/30 border border-brand-green/5 overflow-hidden mb-6 relative">
                  <img src={p.image} className="w-full h-full object-cover grayscale-[0.2] transition-all duration-1000 group-hover:scale-105 group-hover:grayscale-0" alt={p.name} />
                </div>
                <h4 className="text-lg font-sans font-semibold text-brand-green group-hover:text-brand-gold transition-colors leading-tight mb-1">{p.name}</h4>
                <p className="text-base font-sans font-bold text-brand-green/60 uppercase tracking-wider">₹{p.price}</p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
