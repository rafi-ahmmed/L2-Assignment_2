import express, { type Request, type Response } from 'express';
import config from './config/index.js';

const app = express();

app.get('/', async (req: Request, res: Response) => {
   res.json('This server is for dev Plus');
});

export default app;
