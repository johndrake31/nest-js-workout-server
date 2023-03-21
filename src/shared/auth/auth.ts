import { UserEntity } from 'src/user/user.entity';
import { sign, verify } from 'jsonwebtoken';
export interface IJwtTok {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  iat: number;
  exp: number;
  roles: string;
}

export const authJwt = async (jwt: string) => {
  const userJwt = jwt.split(' ')[1];
  const varified = verify(userJwt, process.env.JWT_SECRET);

  if (!varified) {
    throw new Error('invalid token');
  }
  if (varified) {
    return varified as IJwtTok;
  }
};

export const createJwt = (user: UserEntity) => {
  return sign(
    {
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      roles: user.roles,
      id: user.id,
    },
    process.env.JWT_SECRET,
  );
};
