import { pool } from '../db/index.js';

export const getAllUsers = async () => {
   const users = await pool.query(`
         SELECT * FROM users
      `);

   return users.rows;
};
