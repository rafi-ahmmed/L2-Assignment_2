import dotenv from 'dotenv';
import { env } from 'node:process';

dotenv.config({ quiet: true });

const config = {
   port: env.PORT as string,
};

export default config;
