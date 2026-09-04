import { ShoppingBag, X, Plus, Minus, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number, weight: string) => void;
  onRemove: (id: string, weight: string) => void;
}

export default function CartDrawer({ isOpen, onClose, items, onUpdateQuantity, onRemove }: CartDrawerProps) {
  const navigate = useNavigate();
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    onClose();
    navigate('/checkout');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />
          
          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md jesko-glass z-[101] shadow-2xl flex flex-col"
          >
            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
              <div className="flex items-center space-x-3">
                <ShoppingBag className="text-brand-gold" size={24} />
                <h2 className="text-xl font-bold tracking-tight uppercase">Your Arsenal</h2>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
                id="close-cart"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-grow overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center opacity-40">
                  <ShoppingBag size={64} strokeWidth={1} className="mb-4" />
                  <p className="text-sm uppercase tracking-widest font-bold">The bag is empty</p>
                </div>
              ) : (
                items.map((item) => (
                  <motion.div 
                    layout
                    key={`${item.id}-${item.selectedWeight}`} 
                    className="flex space-x-4 bg-white/5 p-4 rounded-xl border border-white/5 group"
                  >
                    <div className="w-20 h-20 bg-white/10 rounded-lg overflow-hidden shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-sm font-bold line-clamp-1 mb-1">{item.name}</h3>
                      <p className="text-[10px] text-brand-gold font-bold uppercase mb-3 opacity-60">
                        {item.selectedWeight}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3 bg-black/40 rounded-lg px-2 py-1">
                          <button 
                            onClick={() => onUpdateQuantity(item.id, -1, item.selectedWeight)}
                            className="p-1 hover:text-brand-gold transition-colors"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                          <button 
                            onClick={() => onUpdateQuantity(item.id, 1, item.selectedWeight)}
                            className="p-1 hover:text-brand-gold transition-colors"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <span className="text-sm font-bold tracking-tight">₹{item.price * item.quantity}</span>
                      </div>
                    </div>
                    <button 
                      onClick={() => onRemove(item.id, item.selectedWeight)}
                      className="opacity-0 group-hover:opacity-100 p-2 text-white/40 hover:text-brand-red transition-all"
                    >
                      <Trash2 size={16} />
                    </button>
                  </motion.div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 border-t border-white/10 bg-white/5 space-y-4">
                <div className="flex justify-between items-end">
                  <span className="text-xs uppercase tracking-widest font-bold opacity-60">Subtotal</span>
                  <span className="text-2xl font-bold tracking-tighter">₹{total}</span>
                </div>
                <button 
                  onClick={handleCheckout}
                  className="w-full bg-brand-gold text-brand-green py-4 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-white transition-all transform active:scale-[0.98] shadow-lg shadow-brand-gold/20"
                >
                  Secure Checkout
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
