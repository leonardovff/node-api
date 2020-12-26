import redis from 'redis';

import { environment } from '../../../config/environment.js';

const redisClient = redis.createClient({
  host: 'redis',
  port: environment.redis.port
});

redisClient.on("error", function(error) {
  console.error(error);
});

export default redisClient;
