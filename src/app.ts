import express, { type Request, type Response } from 'express';
import authRouter from './modules/auth/auth.route.js';
import globalErrorHandler from './middleware/globalErrorHandler.js';
import issueRouter from './modules/issue/issue.route.js';
import cors from 'cors';

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

app.get('/', async (req: Request, res: Response) => {
   res.json('This server is for DevPulse');
});

app.use('/api/auth', authRouter);
app.use('/api/issues', issueRouter);

app.use(globalErrorHandler);

export default app;
