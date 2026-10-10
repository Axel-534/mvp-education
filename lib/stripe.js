import Stripe from 'stripe';

const stripeKey = process.env.STRIPE_SECRET_KEY;

console.log(
  'STRIPE_SECRET_KEY présente :',
  Boolean(stripeKey)
);

const stripe = new Stripe(stripeKey || 'sk_test_placeholder', {
  apiVersion: '2023-10-16',
});

export default stripe;
