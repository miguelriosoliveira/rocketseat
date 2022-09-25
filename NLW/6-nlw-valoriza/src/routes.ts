import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

import {
	AuthenticateUserController,
	CreateComplimentController,
	CreateTagController,
	CreateUserController,
	ListTagsController,
	ListUserReceivedComplimentsController,
	ListUsersController,
	ListUserSentComplimentsController,
} from './controllers';
import { ensureAdmin, ensureAuthenticated } from './middlewares';

export const router = Router();

const createUserController = new CreateUserController();
const listUsersController = new ListUsersController();
const authenticateUserController = new AuthenticateUserController();
const createTagController = new CreateTagController();
const listTagsController = new ListTagsController();
const createComplimentController = new CreateComplimentController();
const listUserReceivedComplimentsController = new ListUserReceivedComplimentsController();
const listUserSentComplimentsController = new ListUserSentComplimentsController();

router.post(
	'/users',
	celebrate({
		[Segments.BODY]: {
			name: Joi.string().required(),
			email: Joi.string().email().required(),
			password: Joi.string().required(),
			admin: Joi.boolean().default(false),
		},
	}),
	createUserController.handle,
);

router.get('/users', ensureAuthenticated, ensureAdmin, listUsersController.handle);

router.post(
	'/authenticate',
	celebrate({
		[Segments.BODY]: {
			email: Joi.string().email().required(),
			password: Joi.string().required(),
		},
	}),
	authenticateUserController.handle,
);

router.post(
	'/tags',
	ensureAuthenticated,
	ensureAdmin,
	celebrate({ [Segments.BODY]: { name: Joi.string().required() } }),
	createTagController.handle,
);

router.get('/tags', ensureAuthenticated, listTagsController.handle);

router.post(
	'/compliments',
	ensureAuthenticated,
	celebrate({
		[Segments.BODY]: {
			user_receiver_id: Joi.string().required(),
			tag_id: Joi.string().required(),
			message: Joi.string().required(),
		},
	}),
	createComplimentController.handle,
);

router.get(
	'/compliments/received',
	ensureAuthenticated,
	listUserReceivedComplimentsController.handle,
);

router.get('/compliments/sent', ensureAuthenticated, listUserSentComplimentsController.handle);
