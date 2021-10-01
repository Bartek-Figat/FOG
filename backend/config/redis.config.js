const redis = require('redis');

const client = redis.createClient({
  port: 6379,
  host: '127.0.0.1',
});

client.on('connect', () => {
  console.log('Redis connected...');
});

client.on('ready', () => {
  console.log('Redis is redy...');
});

client.on('reconnecting', () => {
  console.log('Redis reconnected...');
});

client.on('error', (error) => {
  console.log(error.message);
});

client.on('end', () => {
  console.log('Redis Client disconnected...');
});

client.on('warning', () => {
  console.log('Redis Client warning...');
});

module.exports = {
  client,
};
