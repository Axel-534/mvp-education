import Link from 'next/link';

export default function Subscriptions() {
  const plans = [
    {
      name: "Basique",
      price: "19,99€/mois",
      hours: "10h/mois",
      features: [
        "Accès aux cours de base",
        "Suivi des progrès",
        "Support par email",
      ],
    },
    {
      name: "Premium",
      price: "39,99€/mois",
      hours: "20h/mois",
      features: [
        "Accès à tous les cours",
        "Suivi personnalisé",
        "Support prioritaire",
        "Quiz et exercices illimités",
      ],
    },
    {
      name: "Illimité",
      price: "59,99€/mois",
      hours: "Illimité",
      features: [
        "Accès complet à la plateforme",
        "Suivi ultra-personnalisé",
        "Support 24/7",
        "Accès aux nouvelles fonctionnalités en avant-première",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <header className="bg-blue-600 text-white p-4 mb-8">
        <h1 className="text-2xl font-bold">Nos abonnements</h1>
      </header>
      <main className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div key={plan.name} className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold mb-2">{plan.name}</h2>
              <p className="text-gray-600 mb-4">{plan.hours}</p>
              <p className="text-2xl font-bold mb-4">{plan.price}</p>
              <ul className="mb-6">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center mb-2">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                href={`/signup?plan=${encodeURIComponent(plan.name)}`}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 text-center block"
              >
                Choisir ce plan
              </Link>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

