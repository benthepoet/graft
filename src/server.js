const fs = require('fs');
const http = require('http');
const path = require('path');

module.exports = { start };

function createServer(options) {
  const rootPath = path.resolve(options.root);
  const filePattern = /^\/.+\..+$/;
  const defaultUrl = '/index.html';

  return http.createServer(handleRequest);

  async function handleRequest(request, response) {
    const isFile = filePattern.test(request.url);
    const urlPath = isFile ? request.url : defaultUrl;
    const filePath = rootPath + urlPath;

    try {
      send(await getFile(filePath));
    } catch (error) {
      fail(error);
    }

    function fail(error) {
      console.log(error.stack);
      response.writeHead(500);
      response.end(error.message);
    }

    function send(data) {
      console.log(request.method, urlPath);
      response.end(data);
    }
  }
}

function getFile(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (error, data) => error ? reject(error) : resolve(data));
  });
}

function ready(error) {
  const self = this;

  if (error) {
    throw error;
  }

  console.log('Server Ready', self.address());
}

function start(options) {
  const server = createServer(options);
  server.listen(options.port, ready);
}