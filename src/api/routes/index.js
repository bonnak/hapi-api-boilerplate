'use strict';

const Boom = require('@hapi/boom');

// Import routes
const Users = require('./users.route');

exports.plugin = {
	name: 'routes',
	version: '1.0.0',
	register: async (server, options) => {
		// User endpoints
		await server.route(Users.register);

		// Wildcard endpoint
		await server.route({
			method: ['POST', 'GET', 'PUT', 'DELETE'],
			path: '/{any*}',
			handler: (request, h) => {
				return Boom.notFound('This resource is not available.');
			}
		});
	}
};
