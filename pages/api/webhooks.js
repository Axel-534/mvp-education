import stripe from '../../../lib/stripe';
import { db } from '../../../lib/firebase';
import { doc, updateDoc } from 'firebase/firestore';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const sig = req.headers['stripe-signature'];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET; // On va le créer plus tard

  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.error('Erreur Stripe Webhook :', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Gérer l'événement de succès de paiement
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const userId = session.metadata.userId;
    const subscriptionId = session.subscription;

    // Mettre à jour l'abonnement de l'utilisateur dans Firestore
    try {
      const subscription = await stripe.subscriptions.retrieve(subscriptionId);
      const priceId = subscription.items.data[0].price.id;

      // Déterminer le nom de l'abonnement en fonction de priceId
      let subscriptionName;
      if (priceId === process.env.STRIPE_PRICE_BASIQUE) {
        subscriptionName = 'Basique';
      } else if (priceId === process.env.STRIPE_PRICE_PREMIUM) {
        subscriptionName = 'Premium';
      } else if (priceId === process.env.STRIPE_PRICE_ILLIMITE) {
        subscriptionName = 'Illimité';
      } else {
        subscriptionName = 'Inconnu';
      }

      // Mettre à jour Firestore
      await updateDoc(doc(db, 'users', userId), {
        subscription: subscriptionName,
        stripeSubscriptionId: subscriptionId,
        lastPayment: new Date().toISOString(),
      });

      console.log(`Abonnement mis à jour pour l'utilisateur ${userId}: ${subscriptionName}`);
    } catch (error) {
      console.error('Erreur lors de la mise à jour de Firestore :', error);
    }
  }

  res.status(200).json({ received: true });
}

export const config = {
  api: {
    bodyParser: false,
  },
};
