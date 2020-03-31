import { MongoMemoryServer } from 'mongodb-memory-server';
const mongoose = require('mongoose');

const mongoServer = new MongoMemoryServer();

mongoose.Promise = Promise;

const connectDevDb = async (server, options) => {
	try {
		mongoServer.getUri().then(mongoUri => {
			const mongooseOpts = {
				// options for mongoose 4.11.3 and above
				autoReconnect: true,
				reconnectTries: Number.MAX_VALUE,
				reconnectInterval: 1000,
				useMongoClient: true // remove this line if you use mongoose 5 and above
			};

			mongoose.connect(mongoUri, mongooseOpts);

			let devDB = mongoose.connection;

			devDB.on('error', e => {
				if (e.message.code === 'ETIMEDOUT') {
					console.log(e);
					mongoose.connect(mongoUri, mongooseOpts);
				}
				console.log(e);
			});

			devDB.once('open', () => {
				console.log(`MongoDB successfully connected to ${mongoUri}`);
			});
		});
	} catch {
		return console.log(
			'Unable to establish connection to mongodb-memory-server'
		);
	}
};

exports.connectDevDb = connectDevDb;
exports.mongoose = mongoose;
exports.devDB = devDB;

// module.exports = {
// 	connectDevDb: connectDevDb,
// 	mongoose: mongoose,
// 	devDB: devDb
// };
