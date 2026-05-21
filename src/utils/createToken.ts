import config from '../config/index.js';
import type { ROLE } from '../types/index.js';
import jwt from 'jsonwebtoken';

type TTokenPayload = {
   id: number;
   name: string;
   role: ROLE;
};

const createToken = async (payload: TTokenPayload) => {
   const accessToken = await jwt.sign(payload, config.jwtSecret, {
      expiresIn: '7d',
   });

   return accessToken;
};

export default createToken;
