export default function About() {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <header className="bg-blue-600 text-white p-4 mb-8">
        <h1 className="text-2xl font-bold">À propos de nous</h1>
      </header>
      <main className="max-w-4xl mx-auto">
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">Notre mission</h2>
          <p className="mb-4">
            La <strong>Plateforme Éducative IA</strong> a pour objectif de rendre l'apprentissage
            accessible à tous, de l'élémentaire au supérieur, grâce à des outils intelligents et
            personnalisés.
          </p>
          <p className="mb-4">
            Nous utilisons l'intelligence artificielle pour adapter les cours au profil et au rythme
            de chaque élève, en tenant compte de leur âge, de leurs forces et de leurs besoins.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">Nos valeurs</h2>
          <ul className="list-disc pl-6">
            <li className="mb-2"><strong>Autonomie</strong> : Permettre à chaque élève d'apprendre à son rythme.</li>
            <li className="mb-2"><strong>Personnalisation</strong> : Adapter le contenu pédagogique à chaque profil.</li>
            <li className="mb-2"><strong>Accessibilité</strong> : Rendre l'éducation de qualité accessible à tous.</li>
            <li className="mb-2"><strong>Innovation</strong> : Utiliser les dernières technologies pour améliorer l'apprentissage.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-4">L'équipe</h2>
          <p>
            Ce projet est porté par Ludovic Sangouard, passionné par l'éducation et les nouvelles technologies.
          </p>
        </section>
      </main>
    </div>
  );
}






