import type { NextFunction, Request, Response } from 'express';
import sendResponse from '../utils/sendResponse.js';
import jwt, { type JwtPayload } from 'jsonwebtoken';
import config from '../config/index.js';
import { pool } from '../db/index.js';
import type { ROLE } from '../types/index.js';

const auth = (...roles: ROLE[]) => {
   return async (req: Request, res: Response, next: NextFunction) => {
      try {
         const token = req.headers.authorization;

         if (!token) {
            return sendResponse(res, {
               statusCode: 401,
               message: 'Unauthorized Access',
               success: false,
            });
         }

         const decoded = jwt.verify(token, config.jwtSecret) as JwtPayload;
         const { id, name, role } = decoded;

         const userData = await pool.query(
            `
               SELECT * FROM users 
               WHERE id = $1
            `,
            [id]
         );

         if (userData.rows.length === 0) {
            return sendResponse(res, {
               statusCode: 404,
               message: 'User not found!',
               success: false,
            });
         }

         const user = userData.rows[0];
         if (!roles.includes(user.role)) {
            return sendResponse(res, {
               statusCode: 403,
               success: false,
               message: 'Forbidden access!',
            });
         }

         req.user = decoded;
         next();
      } catch (error) {
         next(error);
      }
   };
};

export default auth;
