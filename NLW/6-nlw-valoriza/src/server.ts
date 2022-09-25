import 'dotenv/config';
import 'express-async-errors';
import 'reflect-metadata';

import celebrate from 'celebrate';
import express from 'express';

import { ErrorController } from './controllers/ErrorController';
import { router } from './routes';

import './database';

const { PORT } = process.env;

const app = express();
const errorController = new ErrorController();

app.use(express.json());
app.use(router);
app.use(celebrate.errors());
app.use(errorController.handle);

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`🚀 Listening on port ${PORT}`));
