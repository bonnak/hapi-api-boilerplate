'use strict';

const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');

const mongoServer = new MongoMemoryServer();

let devDB = null;

exports.plugin = {
	name: 'devDb',
	version: '1.0.0',
	register: async (server, options) => {
		try {
			await mongoServer.getUri().then(uri => {
				mongoose.connect(uri, {
					useNewUrlParser: true,
					useUnifiedTopology: true,
					useFindAndModify: false
				});
				devDB = mongoose.connection;
				devDB.on('error', console.error.bind(console, 'connection error:'));
				devDB.once('open', () => {
					console.log('Connected to database!');
				});
			});
		} catch {
			return console.log(
				'Unable to establish connection to mongodb-memory-server'
			);
		}
	}
};

exports.mongoose = mongoose;
exports.devDB = devDB;
