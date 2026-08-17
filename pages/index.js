 
  export default function Home() {
    return (
      <div className="min-h-screen bg-gray-100">
        <header className="bg-blue-600 text-white p-4">
          <h1 className="text-2xl font-bold">Plateforme Éducative IA</h1>
        </header>
        <main className="p-4">
          <h2 className="text-xl mb-4">Bienvenue sur notre plateforme !</h2>
          <p className="mb-4">Découvrez nos offres d'abonnements pour des cours personnalisés.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {["Basique", "Premium", "Illimité"].map((plan) => (
              <div key={plan} className="border p-4 rounded-lg shadow bg-white">
                <h3 className="font-bold text-lg">{plan}</h3>
                <p className="text-gray-600">
                  {plan === "Basique" ? "10h/mois" : plan === "Premium" ? "20h/mois" : "Illimité"}
                </p>
                <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                  Choisir
                </button>
              </div>
            ))}
          </div>
        </main>
      </div>
    );
 }
