import express, { type Request, type Response } from 'express';
import authRouter from './modules/auth/auth.route.js';
import globalErrorHandler from './middleware/globalErrorHandler.js';
import issueRouter from './modules/issue/issue.route.js';
import auth from './middleware/auth.js';

const app = express();

// Middlewares
app.use(express.json());


app.get('/', async (req: Request, res: Response) => {
   res.json('This server is for DevPulse');
});

app.use('/api/auth', authRouter);
app.use('/api/issues', issueRouter);

app.use(globalErrorHandler);

export default app;
