import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4">
        <nav className="flex justify-between items-center max-w-6xl mx-auto">
          <Link href="/" className="text-2xl font-bold">
            Plateforme Éducative IA
          </Link>
          <div className="flex space-x-4">
            <Link href="/" className="hover:underline">
              Accueil
            </Link>
            <Link href="/about" className="hover:underline">
              À propos
            </Link>
            <Link href="/subscriptions" className="hover:underline">
              Abonnements
            </Link>
            <Link href="/contact" className="hover:underline">
              Contact
            </Link>
            <Link href="/login" className="hover:underline">
              Connexion
            </Link>
          </div>
        </nav>
      </header>
      <main className="p-4 max-w-6xl mx-auto">
        <h2 className="text-xl mb-4">Bienvenue sur notre plateforme !</h2>
        <p className="mb-4">
          Découvrez nos offres d'abonnements pour des cours personnalisés.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {["Basique", "Premium", "Illimité"].map((plan) => (
            <div key={plan} className="border p-4 rounded-lg shadow bg-white">
              <h3 className="font-bold text-lg">{plan}</h3>
              <p className="text-gray-600">
                {plan === "Basique" ? "10h/mois" : plan === "Premium" ? "20h/mois" : "Illimité"}
              </p>
              <Link
                href="/subscriptions"
                className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Voir les détails
              </Link>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
