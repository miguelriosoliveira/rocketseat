import 'dotenv/config';
import 'express-async-errors';
import http from 'http';

import celebrate from 'celebrate';
import cors from 'cors';
import express from 'express';
import { Server } from 'socket.io';

import { globalErrorHandler, routeLogger } from './middlewares';
import { router } from './routes';
import { logger } from './utils/logger';

const { GITHUB_CLIENT_ID } = process.env;

const app = express();

export const httpServer = http.createServer(app);
export const socketServer = new Server(httpServer, {
	cors: { origin: '*' },
});

socketServer.on('connection', socket => {
	logger.info(`User connected on socket ${socket.id}`);
});

app.use(routeLogger);
app.use(cors());
app.use(express.json());
app.use(router);
app.use(celebrate.errors());

app.get('/github', (request, response) => {
	response.redirect(`https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}`);
});

app.get('/signin/callback', (request, response) => {
	const { code } = request.query;
	response.json({ code });
});

app.use(globalErrorHandler);
