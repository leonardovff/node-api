export const environment = {
  hostname: '0.0.0.0',
  port: 80,
  mongo: {
    host: process.env.MONGO_HOST,
    port: process.env.MONGO_PORT,
    user: process.env.MONGO_ROOT_USERNAME,
    password: process.env.MONGO_ROOT_PASSWORD,
    dbName: process.env.MONGO_DB
  },
  mapquestApiKey: process.env.MAPQUEST_API_KEY,
  mapquestUrl: `https://www.mapquestapi.com/`
};
