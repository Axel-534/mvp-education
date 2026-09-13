
   import { useEffect, useState } from 'react';
   import { useRouter } from 'next/router';
   import { onAuthStateChanged } from 'firebase/auth';
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
         <main <button
  onClick={async () => {
    await signOut(auth);
    router.push('/login');
  }}
  className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
>
  Se déconnecter
</button>
className="max-w-4xl mx-auto">
           <h2 className="text-xl mb-4">Bonjour, {user.email} !</h2>
           <p className="mb-4">
             Bienvenue sur ton espace personnel. Ici, tu pourras suivre tes progrès,
             gérer ton abonnement et accéder à tes cours.
           </p>
           <div className="bg-white p-4 rounded-lg shadow">
             <h3 className="font-bold mb-2">Tes informations</h3>
             <p><strong>Email :</strong> {user.email}</p>
             <p><strong>UID :</strong> {user.uid}</p>
           </div>
         </main>
       </div>
     );
   }
