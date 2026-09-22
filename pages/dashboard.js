import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth, db } from '../lib/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState('');
  const [subscription, setSubscription] = useState('Basique');
  const router = useRouter();

  // Récupérer le profil utilisateur
  const fetchUserProfile = async (userId) => {
    try {
      const docRef = doc(db, 'users', userId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserProfile(docSnap.data());
        setName(docSnap.data().name || '');
        setSubscription(docSnap.data().subscription || 'Basique');
      }
    } catch (error) {
      console.error("Erreur lors de la récupération du profil :", error);
    } finally {
      setLoading(false);
    }
  };

  // Mettre à jour le profil
  const updateProfile = async () => {
    try {
      await updateDoc(doc(db, 'users', user.uid), {
        name: name,
        subscription: subscription,
      });
      setUserProfile({ ...userProfile, name: name, subscription: subscription });
      setEditing(false);
      alert('Profil mis à jour avec succès !');
    } catch (error) {
      console.error("Erreur lors de la mise à jour du profil :", error);
      alert('Une erreur est survenue. Veuillez réessayer.');
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        fetchUserProfile(user.uid);
      } else {
        router.push('/login');
      }
    });
    return () => unsubscribe();
  }, [router]);

  if (loading) {
    return <div className="min-h-screen bg-gray-100 flex items-center justify-center">Chargement...</div>;
  }

  if (!user) {
    return <div className="min-h-screen bg-gray-100 flex items-center justify-center">Redirection...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <header className="bg-blue-600 text-white p-4 mb-8">
        <h1 className="text-2xl font-bold">Tableau de bord</h1>
      </header>
      <main className="max-w-4xl mx-auto">
        <h2 className="text-xl mb-4">Bonjour, {userProfile?.name || user.email} !</h2>

        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <h3 className="font-bold mb-2">Tes informations</h3>
          {editing ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Abonnement</label>
                <select
                  value={subscription}
                  onChange={(e) => setSubscription(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="Basique">Basique (10h/mois)</option>
                  <option value="Premium">Premium (20h/mois)</option>
                  <option value="Illimité">Illimité</option>
                </select>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={updateProfile}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  Enregistrer
                </button>
                <button
                  onClick={() => setEditing(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  Annuler
                </button>
              </div>
            </div>
          ) : (
            <div>
              <p><strong>Nom :</strong> {userProfile?.name || 'Non spécifié'}</p>
              <p><strong>Email :</strong> {user.email}</p>
              <p><strong>Abonnement :</strong> {userProfile?.subscription || 'Basique'}</p>
              <p><strong>UID :</strong> {user.uid}</p>
              <button
                onClick={() => setEditing(true)}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Modifier le profil
              </button>
            </div>
          )}
        </div>

        <button
          onClick={async () => {
            await signOut(auth);
            router.push('/login');
          }}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Se déconnecter
        </button>
      </main>
    </div>
  );
}
