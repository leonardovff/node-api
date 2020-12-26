import Mongo from 'mongodb';
const { MongoClient } = Mongo;

import { environment } from '../../../config/environment.js';

const { user, password, host, port, dbName } = environment.mongo;

const URI = `mongodb://${user}:${password}@${host}:${port}`;

const client = new MongoClient(URI, { useUnifiedTopology: true });

const mongoClient = {
  db: null,
  connect: async () => {
    const connection = await client.connect()
    .catch(err => {
      console.error('failed connection with mongo', err);
    })
    mongoClient.db = client.db(dbName);
  }
}

export default mongoClient;
