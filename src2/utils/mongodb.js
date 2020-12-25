const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const interface = {connection: null};

// Connection URL
const url = 'mongodb://root:secret@localhost:27017';

// Database Name
const dbName = 'roga';
// Create a new MongoClient
const client = new MongoClient(url, { useUnifiedTopology: true });

// Use connect method to connect to the Server
client.connect(function(err) {
  if(err){
    console.log(err);
    return connection.error = err;
  }
  interface.connection = () => client.db(dbName);
});

module.exports = interface;
