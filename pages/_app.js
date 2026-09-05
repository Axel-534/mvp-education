import '../styles/globals.css';
import Link from 'next/link';

function Footer() {
  return (
    <footer className="bg-gray-800 text-white p-4 mt-8">
      <div className="max-w-6xl mx-auto flex justify-between">
        <p>© 2026 Plateforme Éducative IA. Tous droits réservés.</p>
        <div className="flex space-x-4">
          <Link href="/contact" className="hover:underline">
            Contact
          </Link>
          <Link href="/about" className="hover:underline">
            À propos
          </Link>
        </div>
      </div>
    </footer>
  );
}

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

export default MyApp;


