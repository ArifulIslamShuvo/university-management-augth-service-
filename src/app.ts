/* eslint-disable no-console */
import express, { Application } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorhandler';
import { UserRouts } from './app/modules/user/user.route';
const app: Application = express();

app.use(cors());

// parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//Application routes

app.use('/api/v1/users/', UserRouts);

// Testing

// app.get('/', (req: Request, res: Response, next: NextFunction) => {
//   throw new Error('error logger test')
// })

//global error handler
app.use(globalErrorHandler);

export default app;
