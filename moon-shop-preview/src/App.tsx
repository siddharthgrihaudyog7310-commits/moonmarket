import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';
import Checkout from './pages/Checkout';
import CartDrawer from './components/CartDrawer';
import ScrollToTop from './components/ScrollToTop';
import { CartItem, Product } from './types';

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleAddToCart = (product: Product, weight?: string) => {
    setCart(prevCart => {
      const existing = prevCart.find(item => item.id === product.id && item.selectedWeight === (weight || product.weightOptions[0]));
      if (existing) {
        return prevCart.map(item => 
          (item.id === product.id && item.selectedWeight === (weight || product.weightOptions[0]))
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1, selectedWeight: weight || product.weightOptions[0] }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (id: string, delta: number, weight: string) => {
    setCart(prev => prev.map(item => {
      if (item.id === id && item.selectedWeight === weight) {
        return { ...item, quantity: item.quantity + delta };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const handleRemoveFromCart = (id: string, weight: string) => {
    setCart(prev => prev.filter(item => !(item.id === id && item.selectedWeight === weight)));
  };

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-brand-dark overflow-x-hidden">
        <Header 
          cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)} 
          wishlistCount={wishlist.length} 
          onOpenCart={() => setIsCartOpen(true)}
        />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home onAddToCart={handleAddToCart} />} />
            <Route path="/shop" element={<Shop onAddToCart={handleAddToCart} />} />
            <Route path="/product/:id" element={<ProductDetails onAddToCart={handleAddToCart} />} />
            <Route path="/checkout" element={<Checkout cart={cart} />} />
            {/* Placeholder routes for others */}
            <Route path="/about" element={<div className="pt-32 text-center py-20 px-4"><h1 className="text-4xl font-bold tracking-tighter uppercase mb-4">Precision Sourcing</h1><p className="opacity-60 max-w-lg mx-auto">Moon Spices & Groceries has brought India's finest dry fruits, dry dates, and whole spices from trusted farms to your home since 1996.</p></div>} />
            <Route path="/contact" element={<div className="pt-32 text-center py-20 px-4">Contact our Concierge</div>} />
          </Routes>
        </main>

        <CartDrawer 
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          items={cart}
          onUpdateQuantity={handleUpdateQuantity}
          onRemove={handleRemoveFromCart}
        />

        <Footer />
      </div>
    </Router>
  );
}
