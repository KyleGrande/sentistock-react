import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserPool } from './cognitoConfig';

const withAuth = (Component) => {
  return (props) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
      const user = UserPool.getCurrentUser();
      const localStorageUser = JSON.parse(localStorage.getItem('user'));
    
      if (user || localStorageUser) {
        user.getSession((err, session) => {
          if (err || !session.isValid()) {
            setIsAuthenticated(false);
            navigate('/Error');
          } else {
            setIsAuthenticated(true);
            navigate('/dashboard');
          }
        });
      } else {
        navigate('/Error');
      }
    }, [navigate]);

    return isAuthenticated && <Component {...props} />;
  };
};

export default withAuth;
