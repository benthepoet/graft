const fs = require('fs');
const http = require('http');
const path = require('path');
const elm = require('node-elm-compiler');

const FILE_TYPE = {
  ELM: 'elm'
};

module.exports = {
  start
};

function createServer(options) {
  const defaultUrl = options.defaultUrl;
  const rootPath = path.resolve(options.root);

  return http.createServer(handleRequest);

  async function handleRequest(request, response) {
    const relativePath = getRelativePath(request.url);
    const filePath = rootPath + relativePath;
    const fileExtension = filePath.split('.').pop();

    try {
      let data;

      switch (fileExtension) {
        case FILE_TYPE.ELM:
          data = await elm.compileToString([filePath], Object.assign({}, options.elm));
          break;

        default:
          data = await getFile(filePath);
          break;
      }

      send(data);
    } catch (error) {
      fail(error);
    }

    function fail(error) {
      console.log(error.stack);
      response.writeHead(500);
      response.end(error.message);
    }

    function send(data) {
      console.log(request.method, relativePath);
      response.end(data);
    }
  }

  function getRelativePath(url) {
    if (url === '/') {
      return url + defaultUrl;
    }

    return url;
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