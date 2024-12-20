import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const plans = [
  {
    name: 'Basic',
    price: 'Free',
    features: [
      '5GB Storage',
      'Basic organization tools',
      'Share with up to 3 people',
      'Mobile app access',
      '7-day history'
    ]
  },
  {
    name: 'Pro',
    price: '$9.99',
    popular: true,
    features: [
      '50GB Storage',
      'Advanced organization',
      'Unlimited sharing',
      'Priority support',
      '30-day history',
      'Custom collections'
    ]
  },
  {
    name: 'Enterprise',
    price: '$24.99',
    features: [
      'Unlimited storage',
      'AI-powered organization',
      'Team collaboration',
      '24/7 priority support',
      'Unlimited history',
      'API access'
    ]
  }
];

export default function Pricing() {
  return (
    <div className="bg-black py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">Simple pricing</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-400">
            Choose the perfect plan for your needs
          </p>
        </div>

        <div className="mt-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative rounded-2xl border ${
                plan.popular ? 'border-blue-500' : 'border-white/10'
              } bg-white/5 p-8 backdrop-blur-sm`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-blue-500 px-4 py-1 text-sm font-medium text-white">
                  Most Popular
                </div>
              )}
              <h3 className="text-xl font-semibold text-white">{plan.name}</h3>
              <div className="mt-4 flex items-baseline">
                <span className="text-4xl font-bold text-white">{plan.price}</span>
                {plan.price !== 'Free' && (
                  <span className="ml-1 text-gray-400">/month</span>
                )}
              </div>
              <ul className="mt-8 space-y-4">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center text-gray-300">
                    <Check className="mr-3 h-5 w-5 text-blue-400" />
                    {feature}
                  </li>
                ))}
              </ul>
              <button className={`mt-8 w-full rounded-lg ${
                plan.popular
                  ? 'bg-blue-500 text-white hover:bg-blue-600'
                  : 'border border-white/10 text-white hover:bg-white/10'
              } px-4 py-2 font-medium transition duration-300`}>
                Get started
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}