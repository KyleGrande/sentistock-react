import React, {useState, useEffect, useCallback} from 'react';
import withAuth from './withAuth';
import SignOutButton from './SignOutButton';
import { UserPool } from './cognitoConfig';
import UserStocksContainer from './UserStocksContainer';
import jwt_decode from 'jwt-decode';
// import { useNavigate } from 'react-router-dom';

function Dashboard() {

  const handleSignOut = () => {
    const user = UserPool.getCurrentUser();

    if (user) {
      user.signOut();
      localStorage.removeItem('user');
    }

  };

  return (
    <div>
      <h1>Dashboard</h1>
      <SignOutButton onSignOut={handleSignOut} />
      <UserStocksContainer />
    </div>
  );
}

export default withAuth(Dashboard);
