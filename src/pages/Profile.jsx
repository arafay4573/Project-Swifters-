import React, { useContext } from 'react';
import AuthContext from '../context/AuthContext';

const Profile = () => {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-primary">Profile</h1>
      {user && (
        <div className="bg-card-bg p-8 rounded-lg shadow-lg">
          <p className="text-text-sub mb-4">Name: {user.name}</p>
          <p className="text-text-sub mb-4">Email: {user.email}</p>
          <p className="text-text-sub">Subscription: {user.subscriptionStatus || 'Free'}</p>
        </div>
      )}
    </div>
  );
};

export default Profile;
