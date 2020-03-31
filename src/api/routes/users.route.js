'use strict';

module.exports = {
	register: {
		method: 'POST',
		path: '/api/users/register',
		handler: () => {
			return 'USER REGISTRATION ENDPOINT';
		}
	}
};
