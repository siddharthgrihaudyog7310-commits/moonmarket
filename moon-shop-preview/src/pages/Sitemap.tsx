import { Link } from 'react-router-dom';
import InfoPage from '../components/InfoPage';

const LINKS = [
  { name: 'Home', path: '/' },
  { name: 'Shop', path: '/shop' },
  { name: 'Checkout', path: '/checkout' },
  { name: 'Our Provenance', path: '/about' },
  { name: 'Contact', path: '/contact' },
  { name: 'Track Your Order', path: '/track' },
  { name: 'Terms of Service', path: '/terms' },
  { name: 'Privacy Policy', path: '/privacy' },
  { name: 'Shipping Inquiry', path: '/shipping' },
];

export default function Sitemap() {
  return (
    <InfoPage title="Sitemap">
      <ul className="!list-none !pl-0 space-y-3">
        {LINKS.map((link) => (
          <li key={link.path}>
            <Link to={link.path} className="text-brand-green font-bold uppercase text-xs tracking-widest hover:text-brand-gold transition-colors">
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </InfoPage>
  );
}
