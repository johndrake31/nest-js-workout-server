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

export const verifyToken = (request, response, next) => {
  const authorization = request.get('authorization');
  const token =
    authorization && authorization.toLowerCase().startsWith('bearer ')
      ? authorization.substring(7)
      : null;

  if (!request.headers.authorization) {
    return response.status(401).json({ error: 'Authorization required' });
  }
  if (token === 'null') {
    return response.status(401).json({ error: 'token missing' });
  }
  const payload = verify(token, process.env.JWT_SECRET);
  if (!payload) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }
  next();
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
