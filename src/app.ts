import mongoose from 'mongoose';
import express, { Application } from 'express';
import swaggerUi from 'swagger-ui-express';
import 'dotenv/config';

import dbConnect from './lib/mongoose';
import { parseNamesAndCreateMap } from './utils/file-parser';
import swaggerSpec from './lib/swagger';
import personRoutes from './endpoint/person.route';
import logger from './lib/logger';

// initialize application
const app: Application  = express();
const dsn: string = process.env.MONGO_URI;

dbConnect(dsn)
  .then(() => {
      logger.info('Connected to db');
      parseNamesAndCreateMap();
  })
  .catch((err: mongoose.Error) => logger.error(err.message));
// Swagger setup
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes setup
app.get('/', (req, res) => res.send('WBB API is up.'));
app.use(personRoutes);

// start the Express server
export default app;