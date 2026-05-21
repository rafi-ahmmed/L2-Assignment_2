import { pool } from '../db/index.js';

export const getSingleIssue = async (id: number) => {
   const singleIssue = await pool.query(
      `
            SELECT * FROM issues WHERE id=$1
         `,
      [id]
   );

   return singleIssue.rows[0];
};
