import faker from 'faker';
import { ActiveModelSerializer, createServer, Factory, Model, Response } from 'miragejs';

interface User {
	name: string;
	email: string;
	created_at: string;
}

export function makeServer() {
	const server = createServer({
		serializers: {
			application: ActiveModelSerializer,
		},

		models: {
			user: Model.extend<Partial<User>>({}),
		},

		factories: {
			user: Factory.extend({
				name() {
					return faker.name.findName();
				},
				email() {
					return faker.internet.email().toLowerCase();
				},
				createdAt() {
					return faker.date.recent(10);
				},
			}),
		},

		// eslint-disable-next-line no-shadow
		seeds(server) {
			server.createList('user', 89);
		},

		routes() {
			this.namespace = 'api';
			this.timing = 750;

			this.get('/users', function f(schema, request) {
				const { page = 1, per_page = 10 } = request.queryParams;
				const total = schema.all('user').length;
				const pageStart = (Number(page) - 1) * Number(per_page);
				const pageEnd = pageStart + Number(per_page);
				const users = this.serialize(schema.all('user'))
					.users.sort((a, b) => b.created_at - a.created_at)
					.slice(pageStart, pageEnd);
				return new Response(
					200,
					{
						'x-total-count': String(total),
					},
					{
						users,
					},
				);
			});
			this.get('/users/:id');
			this.post('/users');

			this.namespace = '';
			this.passthrough();
		},
	});

	return server;
}
