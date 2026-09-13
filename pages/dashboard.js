
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../lib/firebase';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        router.push('/login');
      }
    });

    return () => unsubscribe();
  }, [router]);

  if (!user) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <header className="bg-blue-600 text-white p-4 mb-8">
        <h1 className="text-2xl font-bold">Tableau de bord</h1>
      </header>

      <main>
        <p className="text-lg">
          Bienvenue sur votre tableau de bord !
        </p>

        <p className="mt-2 text-gray-600">
          Connecté en tant que : {user.email}
        </p>

        <button
          onClick={async () => {
            await signOut(auth);
            router.push('/login');
          }}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Se déconnecter
        </button>
      </main>
    </div>
  );
}

