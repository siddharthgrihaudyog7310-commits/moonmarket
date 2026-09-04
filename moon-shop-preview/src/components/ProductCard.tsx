import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Star, ShoppingCart } from 'lucide-react';
import { Product } from '../types';
import React from 'react';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const isSoldOut = product.id === '100';

  return (
    <div className="group bg-white rounded-none overflow-hidden transition-all duration-1000 flex flex-col h-full relative border border-transparent hover:border-brand-gold/10">
      {product.isBestseller && (
        <span className="absolute top-6 left-6 bg-brand-gold text-brand-green text-[7px] font-black tracking-[0.4em] uppercase px-3 py-1.5 z-10 transition-transform duration-500 group-hover:-translate-y-1 shadow-sm">
          Signature Selection
        </span>
      )}
      
      <Link to={`/product/${product.id}`} className="block relative overflow-hidden aspect-[4/5] p-10 bg-[#FBFBFA]">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain mix-blend-multiply transition-all duration-1000 group-hover:scale-105 group-hover:rotate-1"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-brand-green/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
      </Link>

      <div className="py-8 px-2 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-6">
          <Link to={`/product/${product.id}`} className="flex-grow">
            <h3 className="text-[13px] font-bold tracking-tight text-brand-green group-hover:text-brand-gold transition-colors line-clamp-2 h-10 leading-tight">
              {product.name}
            </h3>
          </Link>
          <div className="flex items-center text-brand-gold ml-4 bg-brand-gold/5 px-2 py-0.5 rounded-full">
            <Star size={7} className="fill-brand-gold mr-1" />
            <span className="text-[8px] font-black">{product.rating}</span>
          </div>
        </div>

        <div className="flex items-end justify-between mt-auto pt-6 border-t border-brand-green/5">
          <div className="flex flex-col">
            <span className="text-[7px] text-brand-green/20 uppercase font-black tracking-[0.25em] mb-2">Artisanal Reserve</span>
            <div className="flex items-baseline space-x-2">
              <span className="text-xl font-sans font-bold text-brand-green tracking-tighter">₹{product.price}</span>
              {product.originalPrice && (
                <span className="text-[10px] text-brand-green/20 line-through font-medium">₹{product.originalPrice}</span>
              )}
            </div>
          </div>
          
          <button
            onClick={() => onAddToCart(product)}
            disabled={isSoldOut}
            className="group/btn relative w-11 h-11 flex items-center justify-center transition-all duration-700 overflow-hidden"
            id={`add-to-cart-${product.id}`}
          >
            <div className="absolute inset-0 border border-brand-green/10 group-hover/btn:border-brand-gold transition-all duration-500" />
            <div className="absolute inset-0 bg-brand-gold translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500 ease-out" />
            <ShoppingCart size={15} className="relative z-10 text-brand-green group-hover/btn:text-white transition-colors duration-500" />
          </button>
        </div>
      </div>
    </div>
  );
}
