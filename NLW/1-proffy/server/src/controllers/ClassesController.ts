import { Response, Request } from 'express';

import db from '../database/connection';
import convertTimeToMinutes from '../utils/convertTimeToMinutes';

interface ListClassesRequestQuery {
	week_day: number;
	subject: string;
	time: string;
}

interface Schedule {
	week_day: number;
	from: string;
	to: string;
}

interface CreateClassRequestBody {
	name: string;
	avatar: string;
	whatsapp: string;
	bio: string;
	subject: string;
	cost: number;
	schedule: Schedule[];
}

export default class ClassesController {
	async index(request: Request, response: Response): Promise<Response> {
		const { week_day, subject, time } = request.query as ListClassesRequestQuery;

		if (!week_day || !subject || !time) {
			return response.status(400).json({ error: 'Missing filters to search classes' });
		}

		const timeInMinutes = convertTimeToMinutes(time);
		const classes = await db('classes')
			.whereExists(function () {
				this.select('class_schedules.*')
					.from('class_schedules')
					.whereRaw('`class_schedules`.`class_id` = `classes`.`id`')
					.whereRaw('`class_schedules`.`week_day` = ??', [Number(week_day)])
					.whereRaw('`class_schedules`.`from` <= ??', [timeInMinutes])
					.whereRaw('`class_schedules`.`to` > ??', [timeInMinutes]);
			})
			.where('classes.subject', '=', subject)
			.join('users', 'classes.user_id', '=', 'users.id')
			.select(['classes.*', 'users.*']);

		return response.json(classes);
	}

	async create(request: Request, response: Response): Promise<Response> {
		const {
			name,
			avatar,
			whatsapp,
			bio,
			subject,
			cost,
			schedule,
		} = request.body as CreateClassRequestBody;

		const trx = await db.transaction();

		try {
			const insertedUserIds = await trx('users').insert({ name, avatar, whatsapp, bio });

			const user_id = insertedUserIds[0];
			const insertedClassIds = await trx('classes').insert({ subject, cost, user_id });

			const class_id = insertedClassIds[0];
			const classSchedules = schedule.map(scheduleItem => ({
				class_id,
				week_day: scheduleItem.week_day,
				from: convertTimeToMinutes(scheduleItem.from),
				to: convertTimeToMinutes(scheduleItem.to),
			}));
			await trx('class_schedules').insert(classSchedules);

			await trx.commit();

			return response.status(201).send();
		} catch (error) {
			await trx.rollback();
			return response.status(400).json({ error: 'Unexpected error while creating new class' });
		}
	}
}
