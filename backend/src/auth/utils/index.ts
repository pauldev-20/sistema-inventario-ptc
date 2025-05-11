import { NotAuthorizationError } from '@/common/exceptions/not-authorization.error';
import { config } from '@/config';
import { sign, decode, verify } from 'jsonwebtoken';

export enum TypeToken {
  ACCESS_TOKEN = 'access_token',
}
export type JWT = {
  exp: number;
  type: TypeToken;
  sub: string;
  aud: string;
  iss: string;
};

const privateKey = config.auth.privateKey;
const publicKey = config.auth.publicKey;

export const getAccessToken = ({ userId }: { userId: number }) => {
  return getToken({ userId, type: TypeToken.ACCESS_TOKEN });
};

const getToken = ({ userId, type }: { userId: number; type: TypeToken }) => {
  const expiresIn =
    type === TypeToken.ACCESS_TOKEN ? config.auth.jwt.expiresIn : 60 * 60;

  const token = sign({ type }, privateKey, {
    algorithm: 'RS256',
    expiresIn,
    subject: userId.toString(),
  });
  return {
    token,
    expiration: (decode(token) as JWT).exp * 1000,
  };
};

export const verifyToken = ({ token }: { token: string }) => {
  return verify(token, publicKey, { algorithms: ['RS256'] }, (err) => {
    if (err) {
      throw new NotAuthorizationError('Token inválido');
    }
  });
};

export const verifyAccessToken = ({ token }: { token: string }) => {
  return verify(token, publicKey, { algorithms: ['RS256'] });
};
