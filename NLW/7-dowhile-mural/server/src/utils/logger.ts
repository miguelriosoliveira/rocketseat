import pino from 'pino';

const transport = pino.transport({
	targets: [
		{
			level: 'info',
			target: 'pino-pretty', // must be installed separately
			options: {
				ignore: 'pid,hostname',
				translateTime: 'yyyy-mm-dd HH:MM:ss.l',
			},
		},
	],
});

export const logger = pino(transport);
