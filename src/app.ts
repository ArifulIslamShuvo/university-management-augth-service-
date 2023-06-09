/* eslint-disable no-console */
import express, { Application } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorhandler';
import { UserRouts } from './app/modules/user/user.route';
import { AcademicSemesterRouts } from './app/modules/academicSemester/academicSemester.route';
const app: Application = express();

app.use(cors());

// parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//Application routes

app.use('/api/v1/users/', UserRouts);
app.use('/api/v1/cademic-semester/', AcademicSemesterRouts);

// Testing

// app.get('/', (req: Request, res: Response, next: NextFunction) => {
//   throw new Error('error logger test')
// })

//global error handler
app.use(globalErrorHandler);

export default app;
