const server = require('./src/server');

const options = {
  root: __dirname
};

server
  .createServer(options)
  .listen(8580);
