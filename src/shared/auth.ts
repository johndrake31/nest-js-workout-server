import { UserEntity } from 'src/user/user.entity';
import { sign, verify } from 'jsonwebtoken';
export interface IJwtTok {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  iat: number;
  exp: number;
  roles: string[];
}

export const authJwt = async (jwt: string) => {
  const userJwt = jwt.split(' ')[1];
  try {
    const varified = verify(userJwt, process.env.JWT_SECRET);
    console.log(varified);
    if (varified) {
      return varified as IJwtTok;
    }
    if (!varified) {
      return false;
    }
  } catch (error) {
    console.log(error);
  }
};

export const createJwt = (user: any) => {
  const payload = { ...user };
  if (payload.password) delete payload.password;
  return sign(
    {
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      roles: [...user.roles],
      id: user.id,
    },
    process.env.JWT_SECRET,
  );
};
