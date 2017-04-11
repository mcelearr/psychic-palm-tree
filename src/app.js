const hapi = require('hapi');
const inert = require('inert');

const server = new hapi.Server();

server.connection({
  host: 'localhost',
  port: 3000
});

server.route({
  method: 'GET',
  path: '/hello',
  handler: (request, reply) => {
    reply('Hello world!');
  }
});

server.route({
  method: 'GET',
  path: '/user/{name}',
  handler: (request, reply) => {
    reply(`Hello ${encodeURIComponent(request.params.name)}!`);
  }
});

server.register(inert, (err) => {
  if (err) throw err;
  server.route({
    method: 'GET',
    path: '/{file*}',
    handler: {
      directory: {
        path: 'public/'
      }
    }
  });
});

server.start((err) => {
  if (err) throw err;
  console.log(`Server running at ${server.info.uri}`);
});
