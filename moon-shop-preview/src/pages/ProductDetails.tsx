import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Star, ShoppingBag, ShieldCheck, Truck, RefreshCcw, Minus, Plus, ZoomIn, X } from 'lucide-react';
import { PRODUCTS, priceFor, imageFor } from '../data';
import { Product } from '../types';
import { useEffect, useState } from 'react';
import Accordion from '../components/Accordion';

export default function ProductDetails({ onAddToCart }: { onAddToCart: (product: Product, weight: string, quantity: number) => void }) {
  const { id } = useParams<{ id: string }>();
  const product = PRODUCTS.find((p) => p.id === id);
  const [selectedWeight, setSelectedWeight] = useState(product?.weightOptions[0] || '250g');
  const [quantity, setQuantity] = useState(1);
  const [isZoomed, setIsZoomed] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  useEffect(() => {
    setSelectedWeight(product?.weightOptions[0] || '250g');
    setQuantity(1);
  }, [product]);

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

  const handleAdd = () => {
    onAddToCart(product, selectedWeight, quantity);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1800);
  };

  const detailItems = [
    ...(product.additionalInfo
      ? [{
          title: "What's Inside",
          content: (
            <ul className="space-y-3">
              {product.additionalInfo.map((info, i) => (
                <li key={i} className="flex items-start space-x-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-gold mt-1.5 shrink-0" />
                  <span>{info}</span>
                </li>
              ))}
            </ul>
          ),
        }]
      : []),
    ...(product.nutrition
      ? [{
          title: 'Nutritional Profile',
          content: (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {Object.entries(product.nutrition).map(([key, val]) => (
                <div key={key} className="bg-brand-cream/60 p-4 border border-brand-green/5">
                  <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-brand-green/30 mb-1">{key}</p>
                  <p className="text-sm font-bold text-brand-green">{val as string}</p>
                </div>
              ))}
            </div>
          ),
        }]
      : []),
    ...(product.specifications
      ? [{
          title: 'Specifications',
          content: (
            <div className="divide-y divide-brand-green/5">
              {Object.entries(product.specifications).map(([key, val]) => (
                <div key={key} className="flex justify-between py-2">
                  <span className="font-bold text-brand-green/50 uppercase tracking-widest text-[10px]">{key}</span>
                  <span className="font-semibold text-brand-green">{val}</span>
                </div>
              ))}
            </div>
          ),
        }]
      : []),
    {
      title: 'Delivery & Ordering',
      content: (
        <div className="space-y-3">
          <p>
            We deliver across India. Once you place an order, we confirm delivery charges and timelines with you
            directly on WhatsApp.
          </p>
          {product.minimumOrderQuantity && <p>Minimum order quantity for this item: {product.minimumOrderQuantity}.</p>}
          <p>
            Have a question about this product before you order? {' '}
            <a href="https://wa.me/917054578781" target="_blank" rel="noopener noreferrer" className="text-brand-gold underline">
              Ask us on WhatsApp
            </a>
            .
          </p>
        </div>
      ),
    },
  ];

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
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6 lg:sticky lg:top-32"
          >
            <button
              onClick={() => setIsZoomed(true)}
              className={`aspect-square w-full border border-brand-green/5 overflow-hidden flex items-center justify-center group relative cursor-zoom-in p-12 ${product.category === 'Whole Spices' ? 'bg-white' : 'bg-[#FBFBFA]'}`}
            >
              {product.isBestseller && (
                <span className="absolute top-8 left-8 z-10 bg-brand-gold text-white px-4 py-2 text-[9px] font-black uppercase tracking-widest">
                  Bestseller
                </span>
              )}
              <span className="absolute bottom-6 right-6 z-10 bg-white/90 backdrop-blur text-brand-green p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                <ZoomIn size={16} />
              </span>
              <img
                src={imageFor(product, selectedWeight)}
                alt={product.name}
                className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
              />
            </button>
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
                    <Star key={i} size={14} fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'} strokeWidth={3} />
                  ))}
                </div>
                {product.reviewsCount != null && (
                  <span className="text-[10px] font-bold uppercase tracking-widest text-brand-green/40">{product.reviewsCount} Appraisals</span>
                )}
              </div>

              <h1 className="text-5xl md:text-7xl font-serif italic text-brand-green leading-tight">{product.name}</h1>

              <div className="flex items-baseline space-x-6">
                <span className="text-4xl font-serif text-brand-gold italic">₹{priceFor(product, selectedWeight)}</span>
                {product.originalPrice && (
                  <span className="text-xl text-brand-green/20 line-through">₹{product.originalPrice}</span>
                )}
                <span className="text-xs font-bold text-brand-green/40 uppercase tracking-widest">Per {selectedWeight}</span>
              </div>

              <p className="text-brand-green/70 text-lg font-normal leading-relaxed max-w-lg">
                {product.description}
              </p>
            </div>

            {/* Selection */}
            <div className="space-y-8">
              {product.weightOptions.length > 1 ? (
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
                        {weight} · ₹{priceFor(product, weight)}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex items-center space-x-3 text-[10px] font-black uppercase tracking-[0.4em] text-brand-green/40">
                  <span>Pack Size</span>
                  <span className="text-brand-green">{selectedWeight}</span>
                </div>
              )}

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <div className="flex items-center border border-brand-green/10 w-fit">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    disabled={quantity <= 1}
                    aria-label="Decrease quantity"
                    className="p-4 text-brand-green hover:bg-brand-cream/60 disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="w-14 text-center font-bold text-brand-green tabular-nums">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    aria-label="Increase quantity"
                    className="p-4 text-brand-green hover:bg-brand-cream/60 transition-colors"
                  >
                    <Plus size={14} />
                  </button>
                </div>

                <button
                  onClick={handleAdd}
                  className="group relative flex-1 bg-brand-green text-white px-10 py-6 font-black uppercase text-[10px] tracking-[0.5em] overflow-hidden shadow-2xl flex items-center justify-center space-x-4"
                >
                  <div className="absolute inset-0 bg-brand-gold translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                  <AnimatePresence mode="wait" initial={false}>
                    {justAdded ? (
                      <motion.span
                        key="added"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        className="relative z-10"
                      >
                        Added to Harvest ✓
                      </motion.span>
                    ) : (
                      <motion.span
                        key="add"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        className="relative z-10 flex items-center space-x-4"
                      >
                        <ShoppingBag size={18} />
                        <span>Add to Harvest</span>
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              </div>

              {product.minimumOrderQuantity && (
                <div className="p-6 bg-brand-gold/5 border border-brand-gold/10 inline-block">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-gold">
                    Minimum Order Quantity: {product.minimumOrderQuantity}
                  </p>
                </div>
              )}
            </div>

            {/* Quick Benefits */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-12 border-t border-brand-green/5">
              {[
                { icon: ShieldCheck, title: 'Obsessive Quality', desc: 'Hand-inspected harvest' },
                { icon: Truck, title: 'Direct Transit', desc: 'Farm to your table' },
                { icon: RefreshCcw, title: 'Purity Promise', desc: 'No additives, ever' },
              ].map((item, i) => (
                <div key={i} className="space-y-2">
                  <item.icon size={20} className="text-brand-gold" strokeWidth={1.5} />
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-brand-green">{item.title}</h4>
                  <p className="text-[10px] font-medium text-brand-green/40">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Details Accordion */}
            <div className="pt-4">
              <Accordion items={detailItems} defaultOpen={0} />
            </div>
          </motion.div>
        </div>

        {/* Suggestion Section */}
        <section className="mt-32">
          <div className="text-center mb-16 space-y-4">
            <span className="text-brand-gold text-[10px] font-black uppercase tracking-[0.6em] block">Complementary Selection</span>
            <h2 className="text-5xl font-serif italic text-brand-green">Curated For You</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {PRODUCTS.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 4).map((p) => (
              <Link key={p.id} to={`/product/${p.id}`} className="group">
                <div className={`aspect-square border border-brand-green/5 overflow-hidden mb-6 relative p-8 ${product.category === 'Whole Spices' ? 'bg-white' : 'bg-[#FBFBFA]'}`}>
                  <img src={p.image} className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105" alt={p.name} />
                </div>
                <h4 className="text-lg font-sans font-semibold text-brand-green group-hover:text-brand-gold transition-colors leading-tight mb-1">{p.name}</h4>
                <p className="text-base font-sans font-bold text-brand-green/60 uppercase tracking-wider">₹{p.price}</p>
              </Link>
            ))}
          </div>
        </section>
      </div>

      {/* Image Lightbox */}
      <AnimatePresence>
        {isZoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsZoomed(false)}
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-6 cursor-zoom-out"
          >
            <button
              onClick={() => setIsZoomed(false)}
              aria-label="Close"
              className="absolute top-6 right-6 text-white/70 hover:text-white p-3"
            >
              <X size={28} />
            </button>
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              src={imageFor(product, selectedWeight)}
              alt={product.name}
              className="max-w-full max-h-full object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
