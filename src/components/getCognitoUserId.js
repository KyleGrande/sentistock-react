import { UserPool } from './cognitoConfig';

export const getCognitoUserId = () => {
  const user = UserPool.getCurrentUser();
  return user ? user.getUsername() : null;
};
