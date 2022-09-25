import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

import {
	AuthenticateUserController,
	CreateMessageController,
	GetLast3MessagesController,
	GetUserProfileController,
} from './controllers';
import { ensureAuthenticated } from './middlewares';

export const router = Router();

const authenticateUserController = new AuthenticateUserController();
const createMessageController = new CreateMessageController();
const getLast3MessagesController = new GetLast3MessagesController();
const getUserProfileController = new GetUserProfileController();

router.post(
	'/authenticate',
	celebrate({
		[Segments.BODY]: {
			code: Joi.string().required(),
			client_type: Joi.string().allow('server', 'web', 'mobile').only().required(),
		},
	}),
	authenticateUserController.handle,
);

router.post(
	'/messages',
	ensureAuthenticated,
	celebrate({
		[Segments.BODY]: {
			message: Joi.string().required(),
		},
	}),
	createMessageController.handle,
);

router.get('/messages/last3', getLast3MessagesController.handle);

router.get('/profile', ensureAuthenticated, getUserProfileController.handle);
