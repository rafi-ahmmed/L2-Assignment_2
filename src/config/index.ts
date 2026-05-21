import dotenv from 'dotenv';
import { env } from 'node:process';

dotenv.config({ quiet: true });

const config = {
   port: env.PORT as string,
   connectionString: env.CONNECTION_STRING as string,
   jwtSecret: env.JWT_SECRET as string,
};

export default config;
