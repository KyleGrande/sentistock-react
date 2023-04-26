// import React, { useEffect } from 'react';
// import { UserPool } from './cognitoConfig';
// import { useNavigate } from 'react-router-dom';

// function SignOut() {
//   const navigate = useNavigate();

//   useEffect(() => {
//     const user = UserPool.getCurrentUser();

//     if (user) {
//       user.signOut();
//       localStorage.removeItem('user');
//     }

//     navigate('/');
//   }, [navigate]);

//   return <div>Signing out...</div>;
// }

// export default SignOut;
