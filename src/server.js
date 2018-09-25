const fs = require('fs');
const http = require('http');
const path = require('path');
const elm = require('node-elm-compiler');

const CONTENT_TYPE = {
  JAVASCRIPT: 'application/javascript'
};

module.exports = {
  createServer
};

function createServer(options) {
  const defaultUrl = options.defaultUrl;
  const rootPath = path.resolve(options.root);

  return http.createServer(handleRequest);

  function handleRequest(request, response) {
    const relativePath = getRelativePath(request.url);
    const filePath = rootPath + relativePath;

    console.log(request.method, relativePath);

    if (relativePath.indexOf(options.mainUrl) > -1) {
      elm
        .compileToString([filePath], Object.assign({}, options.elm))
        .then(data => {
          console.log('Compiled:', relativePath);
          send(CONTENT_TYPE.JAVASCRIPT, data);
        })
        .catch(error => response.end(error.message));
    }
    else {
      fs.readFile(filePath, (err, data) => {
        if (err) {
          response.writeHead(404);
          response.end('Not Found');
        } else {
          response.end(data);
        }
      });
    }

    function send(contentType, data) {
      response.setHeader('Content-Type', contentType);
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
