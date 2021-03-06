import 'module-alias/register';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import { attachPublicRoutes } from './routes';

import { handleErrors } from 'middleware/errors';
import { RouteNotFoundError } from 'errors/custom';
import createConnection from 'database/createConnection';

const establishDbConnection = async (): Promise<void> => {
  try {
    await createConnection();
  } catch (err) {
    console.error(err);
  }
}

const initExpress = (): void => {
  const app = express();
  const router = express.Router();

  if (process.env.NODE_ENV != 'production') {
    app.use(morgan('dev'));
  }

  app.use(cors());
  app.use(helmet());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  attachPublicRoutes(router);

  app.use('/v1', router);

  app.use((req, _res, next) => next(new RouteNotFoundError(req.originalUrl)));
  app.use(handleErrors);

  app.listen(process.env.API_PORT || 3000);
}

const initApp = async (): Promise<void> => {
  console.log("> Starting API ...");

  console.log("> Connecting to DB ...");
  await establishDbConnection();
  console.log("> Connected!");
  
  initExpress();
  console.log(`> API Started on http://localhost:${process.env.API_PORT}`);
}

initApp();