import { pool } from '../../db/index.js';
import type {
   IUser,
   TSigninPayload,
   TSignupPayload,
} from '../../types/index.js';
import bcrypt from 'bcrypt';
import createToken from '../../utils/createToken.js';

const createUserInDB = async (payload: TSignupPayload) => {
   const { email, name, password, role }: TSignupPayload = payload;

   // convert pass in hash
   const hashPass = await bcrypt.hash(password, 10);

   const result = await pool.query(
      `

         INSERT INTO users(email,name,password,role)
         VALUES($1,$2,$3,$4)
         RETURNING *

      `,
      [email, name, hashPass, role]
   );

   delete result.rows[0].password;

   return result.rows[0];
};

const signInUserIntoDB = async (payload: TSigninPayload) => {
   const { email, password }: TSigninPayload = payload;

   const user = await pool.query(
      `
      SELECT * FROM users 
      WHERE email = $1
      `,
      [email]
   );

   if (user.rows.length === 0) {
      throw new Error('User not found');
   }

   const { password: hashPass, id, name, role } = user.rows[0];
   const isPasswordValid = await bcrypt.compare(password, hashPass);

   if (!isPasswordValid) {
      throw new Error('Invalid Password!');
   }
   const tokenPayload = { id, name, role };
   const token = await createToken(tokenPayload);
   delete user.rows[0].password;
   return { token, user: user.rows[0] };
};

const authServices = {
   createUserInDB,
   signInUserIntoDB,
};
export default authServices;
