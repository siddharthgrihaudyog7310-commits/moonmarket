import InfoPage from '../components/InfoPage';

export default function Login() {
  return (
    <InfoPage title="Accounts — Coming Soon" subtitle="Assistance">
      <p>
        We don't have customer accounts set up on the website yet. For now, every order is placed and tracked
        personally over WhatsApp — no password required.
      </p>
      <a
        href="https://wa.me/917054578781"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-brand-green text-white px-10 py-4 font-bold uppercase text-[10px] tracking-[0.4em] hover:bg-brand-gold transition-colors mt-2"
      >
        Message Us on WhatsApp
      </a>
    </InfoPage>
  );
}
