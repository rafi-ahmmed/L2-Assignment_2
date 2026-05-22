import type { JwtPayload } from 'jsonwebtoken';
import { pool } from '../../db/index.js';
import {
   userRole,
   type TQueryParams,
   type TIssueReqBody,
   type TIssueUpdateBody,
} from '../../types/index.js';
import { getAllUsers } from '../../utils/getAllUsers.js';
import { getSingleIssue } from '../../utils/getSingleIssue.js';

const storeIssueInDB = async (
   payload: TIssueReqBody,
   jwtPayload: JwtPayload
) => {
   const { title, description, type }: TIssueReqBody = payload;
   const { id, name, role } = jwtPayload;

   const result = await pool.query(
      `
         INSERT INTO issues (title,description,type,reporter_id)
         VALUES($1,$2,$3,$4)
         RETURNING *
      `,
      [title, description, type, id]
   );

   return result.rows[0];
};

const getAllIssuesFromDB = async (query: TQueryParams) => {
   const { sort = 'newest', type, status } = query;

   let baseQuery = `SELECT * FROM issues WHERE 1=1`;
   const queryParams: any[] = [];

   if (type) {
      queryParams.push(type);
      baseQuery += ` AND type = $${queryParams.length}`;
   }

   if (status) {
      queryParams.push(status);
      baseQuery += ` AND status = $${queryParams.length}`;
   }

   baseQuery +=
      sort === 'oldest'
         ? ` ORDER BY created_at ASC`
         : ` ORDER BY created_at DESC`;

   const issuesResult = await pool.query(baseQuery, queryParams);

   const issueList = issuesResult.rows;

   const formattedIssues = await Promise.all(
      issueList.map(async (singleIssue) => {
         const reporterResult = await pool.query(
            `SELECT id, name, role FROM users WHERE id=$1`,
            [singleIssue.reporter_id]
         );

         return {
            id: singleIssue.id,
            title: singleIssue.title,
            description: singleIssue.description,
            type: singleIssue.type,
            status: singleIssue.status,
            reporter: reporterResult.rows[0] || null,
            created_at: singleIssue.created_at,
            updated_at: singleIssue.updated_at,
         };
      })
   );

   return formattedIssues;
};

const getSingleIssueFromDB = async (id: string) => {
   const users = await getAllUsers();
   const issue = await getSingleIssue(Number(id));
   const { email, password, created_at, updated_at, ...reporter } = users.find(
      (user) => user.id === issue.reporter_id
   );

   return {
      id: issue.id,
      title: issue.title,
      description: issue.description,
      type: issue.type,
      status: issue.status,
      reporter,
      created_at: issue.created_at,
      updated_at: issue.updated_at,
   };
};

const updateIssueInDB = async (
   id: string,
   userPayload: TIssueUpdateBody,
   jwtPayload: JwtPayload
) => {
   const { title, description, type } = userPayload;
   const { id: userId, name, role } = jwtPayload;
   const issue = await getSingleIssue(Number(id));
   if (issue) {
      throw new Error('Issue not found');
   }
   const { status, reporter_id } = issue;
   const isContriButor = role === userRole.CONTRIBUTOR;

   if (isContriButor) {
      if (userId !== reporter_id || status !== 'open') {
         throw new Error('Contributors can only update their own open issues');
      }
   }

   const result = await pool.query(
      `
         UPDATE issues 
         SET title = COALESCE($1,title),
            description = COALESCE($2,description),
            type = COALESCE($3,type),
            updated_at = NOW()
         WHERE id = $4
         RETURNING *
      `,
      [title, description, type, Number(id)]
   );

   // console.log(result.rows[0]);
   return result.rows[0];
};

const deleteIssueFromDB = async (id: string, jwtPayload: JwtPayload) => {
   const result = await pool.query(
      `
      DELETE FROM issues
      WHERE id=$1;
      `,
      [Number(id)]
   );

   if (result.rowCount === 0) {
      throw new Error('Issue not found');
   }
   return result.rowCount;
};

const issueServices = {
   storeIssueInDB,
   getAllIssuesFromDB,
   getSingleIssueFromDB,
   updateIssueInDB,
   deleteIssueFromDB,
};

export default issueServices;
