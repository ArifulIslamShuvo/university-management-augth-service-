/* eslint-disable no-console */
import mongoose from 'mongoose';
import app from './app';
import config from './config/index';
import { errorlogger, logger } from './shared/logger';
import { Server } from 'http';

process.on('unhandledRejection', error => {
  errorlogger.error(error);
  process.exit(1);
});

let server: Server;
async function bootstrap() {
  try {
    await mongoose.connect(config.database_url as string);
    logger.info('Data base is connected successfully');

    server = app.listen(config.port, () => {
      logger.info(`application app listening on port ${config.port}`);
    });
  } catch (error) {
    errorlogger.error('Failled to connect databse', error);
  }

  process.on('unhandledRejection', error => {
    if (server) {
      server.close(() => {
        errorlogger.error(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}
bootstrap();

process.on('SIGTERM', () => {
  logger.info('SIGTERM is receved');
  if (server) {
    server.close();
  }
});
