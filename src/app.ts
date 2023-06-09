/* eslint-disable no-console */
import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorhandler';
import routers from './app/routes';
import httpStatus from 'http-status';
import cookieParser from 'cookie-parser';
const app: Application = express();

app.use(cors());
app.use(cookieParser());

// parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//Application routes

app.use('/api/v1', routers);
// Testing

// app.get('/', (req: Request, res: Response, next: NextFunction) => {
//   throw new Error('error logger test')
// })

//global error handler
app.use(globalErrorHandler);

//Handle not fot route
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'API Not Found',
      },
    ],
  });
  next();
});

export default app;
