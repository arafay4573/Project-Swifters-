import React from 'react';

const Pricing = () => {
  return (
    <div className="text-center py-16">
      <h1 className="text-4xl font-bold mb-8 text-primary">Choose Your Plan</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <div className="bg-card-bg p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Free Plan</h2>
          <p className="text-4xl font-bold mb-4">$0<span className="text-lg text-text-sub">/month</span></p>
          <ul className="text-text-sub space-y-2">
            <li>2 story generations per month</li>
            <li>Limited voice options</li>
            <li>No video downloads</li>
          </ul>
        </div>
        <div className="bg-card-bg p-8 rounded-lg shadow-lg border-2 border-primary">
          <h2 className="text-2xl font-bold mb-4 text-primary">Pro Plan</h2>
          <p className="text-4xl font-bold mb-4">$9.99<span className="text-lg text-text-sub">/month</span></p>
          <ul className="text-text-sub space-y-2">
            <li>Unlimited story generations</li>
            <li>All voice options</li>
            <li>Video downloads</li>
          </ul>
          <button className="mt-8 bg-primary text-dark-bg px-8 py-3 rounded-lg font-semibold hover:bg-opacity-80 transition-all shadow-glow-primary">
            Upgrade to Pro
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
