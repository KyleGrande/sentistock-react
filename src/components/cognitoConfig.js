import { CognitoUserPool } from 'amazon-cognito-identity-js';

const poolData = {
    UserPoolId: "us-east-1_46O09OuDv",
    ClientId: "698lj34h67ba0g4i62uu05nkur",
};

export const UserPool = new CognitoUserPool(poolData);
