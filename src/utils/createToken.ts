import config from '../config/index.js';
import type { ROLE } from '../types/index.js';
import jwt from 'jsonwebtoken';

type TTokenPayload = {
   id: number;
   name: string;
   role: ROLE;
};

const createToken = (payload: TTokenPayload) => {
   const accessToken = jwt.sign(payload, config.jwtSecret, {
      expiresIn: '7d',
   });

   return accessToken;
};

export default createToken;
