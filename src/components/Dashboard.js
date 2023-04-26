import React from 'react';
import withAuth from './withAuth';
import SignOutButton from './SignOutButton';
import { UserPool } from './cognitoConfig';
// import { useNavigate } from 'react-router-dom';

function Dashboard() {
  // const navigate = useNavigate();

  const handleSignOut = () => {
    const user = UserPool.getCurrentUser();

    if (user) {
      user.signOut();
      localStorage.removeItem('user');
    }

    // navigate('/home');
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <SignOutButton onSignOut={handleSignOut} />
    </div>
  );
}

export default withAuth(Dashboard);
