import axios from 'axios';
import { sign } from 'jsonwebtoken';

import { AppError } from '../errors';
import { prismaClient } from '../prisma';

import { IService } from './IService';

interface IParams {
	code: string;
	client_type: 'server' | 'web' | 'mobile';
}

interface IAccessTokenResponse {
	access_token: string;
	error?: string;
	error_description?: string;
}

interface IUserResponse {
	id: number;
	name: string;
	login: string;
	avatar_url: string;
}

export class AuthenticateUserService implements IService {
	async execute({ code, client_type }: IParams) {
		const { data: accessTokenResponse } = await axios.post<IAccessTokenResponse>(
			'https://github.com/login/oauth/access_token',
			null,
			{
				headers: {
					Accept: 'application/json',
				},
				params: {
					// client_id: process.env.GITHUB_CLIENT_ID,
					client_id: process.env[`GITHUB_CLIENT_ID_${client_type.toUpperCase()}`],
					client_secret: process.env[`GITHUB_CLIENT_SECRET_${client_type.toUpperCase()}`],
					code,
				},
			},
		);

		if (accessTokenResponse.error) {
			const errorMessage = accessTokenResponse.error_description || accessTokenResponse.error;
			throw new AppError(errorMessage, 403);
		}

		const { data: userData } = await axios.get<IUserResponse>('https://api.github.com/user', {
			headers: {
				Authorization: `Bearer ${accessTokenResponse.access_token}`,
			},
		});

		const { id: github_id, login, name, avatar_url } = userData;

		let user = await prismaClient.user.findFirst({ where: { github_id } });

		if (!user) {
			user = await prismaClient.user.create({
				data: {
					github_id,
					login,
					name,
					avatar_url,
				},
			});
		}

		const token = sign(
			{
				user: {
					name,
					avatar_url,
					id: user.id,
				},
			},
			process.env.JWT_SECRET,
			{
				subject: user.id,
				expiresIn: '1d',
			},
		);

		return { token, user };
	}
}
