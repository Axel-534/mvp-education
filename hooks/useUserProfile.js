 import { useState, useEffect } from 'react';
   import { doc, setDoc, getDoc } from 'firebase/firestore';
   import { db } from '../lib/firebase';
   import { onAuthStateChanged } from 'firebase/auth';
   import { auth } from '../lib/firebase';

   export const useUserProfile = () => {
     const [userProfile, setUserProfile] = useState(null);
     const [loading, setLoading] = useState(true);

     // Créer ou mettre à jour un profil utilisateur
     const createOrUpdateProfile = async (userId, profileData) => {
       try {
         await setDoc(doc(db, 'users', userId), profileData, { merge: true });
         setUserProfile(profileData);
       } catch (error) {
         console.error("Erreur lors de la mise à jour du profil :", error);
       }
     };

     // Récupérer le profil utilisateur
     const fetchUserProfile = async (userId) => {
       try {
         const docRef = doc(db, 'users', userId);
         const docSnap = await getDoc(docRef);
         if (docSnap.exists()) {
           setUserProfile(docSnap.data());
         } else {
           setUserProfile(null);
         }
       } catch (error) {
         console.error("Erreur lors de la récupération du profil :", error);
       } finally {
         setLoading(false);
       }
     };

     // Écouter les changements d'authentification
     useEffect(() => {
       const unsubscribe = onAuthStateChanged(auth, (user) => {
         if (user) {
           fetchUserProfile(user.uid);
         } else {
           setUserProfile(null);
           setLoading(false);
         }
       });
       return () => unsubscribe();
     }, []);

     return { userProfile, loading, createOrUpdateProfile };
   };
