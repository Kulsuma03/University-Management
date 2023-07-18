import express, { Application } from 'express';
import cors from 'cors';
import { logger } from './shared/logger';
import globalErrorHandler from './app/modules/users/middlewares/globalErrorHandlars';
import { userRoutes } from './app/modules/users/user.route';
// import { promises } from 'winston-daily-rotate-file'

const app: Application = express();

app.use(cors());

//perser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Application routes

logger.info(app.get('env'));
app.use('/api/v1/users', userRoutes);

// testing
app.get('/', async () => {
  throw new Error('Testing error logger');
});

// global error handler
app.use(globalErrorHandler);

export default app;
