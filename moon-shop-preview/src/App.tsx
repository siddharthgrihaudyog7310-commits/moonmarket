import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';
import Checkout from './pages/Checkout';
import About from './pages/About';
import Contact from './pages/Contact';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import Shipping from './pages/Shipping';
import Track from './pages/Track';
import Sitemap from './pages/Sitemap';
import Login from './pages/Login';
import CartDrawer from './components/CartDrawer';
import ScrollToTop from './components/ScrollToTop';
import { CartItem, Product } from './types';

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleAddToCart = (product: Product, weight?: string, quantity: number = 1) => {
    setCart(prevCart => {
      const targetWeight = weight || product.weightOptions[0];
      const existing = prevCart.find(item => item.id === product.id && item.selectedWeight === targetWeight);
      if (existing) {
        return prevCart.map(item =>
          (item.id === product.id && item.selectedWeight === targetWeight)
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevCart, { ...product, quantity, selectedWeight: targetWeight }];
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

  const handleClearCart = () => setCart([]);

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-brand-dark overflow-x-hidden">
        <Header
          cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)}
          onOpenCart={() => setIsCartOpen(true)}
        />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home onAddToCart={handleAddToCart} />} />
            <Route path="/shop" element={<Shop onAddToCart={handleAddToCart} />} />
            <Route path="/product/:id" element={<ProductDetails onAddToCart={handleAddToCart} />} />
            <Route path="/checkout" element={<Checkout cart={cart} onClearCart={handleClearCart} />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/shipping" element={<Shipping />} />
            <Route path="/track" element={<Track />} />
            <Route path="/sitemap" element={<Sitemap />} />
            <Route path="/login" element={<Login />} />
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
