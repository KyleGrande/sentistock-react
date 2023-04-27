import { UserPool } from './cognitoConfig';

export const getCognitoUserId = () => {
  const user = UserPool.getCurrentUser();
  return user ? user.getUsername() : null;
};

export const getUserGivenName = async () => {
  const user = UserPool.getCurrentUser();
  if (!user) {
    return null;
  }

  return new Promise((resolve, reject) => {
    user.getUserAttributes((err, attributes) => {
      if (err) {
        reject(err);
        return;
      }

      const givenNameAttribute = attributes.find(
        (attribute) => attribute.Name === "given_name"
      );

      resolve(givenNameAttribute ? givenNameAttribute.Value : null);
    });
  });
};

  