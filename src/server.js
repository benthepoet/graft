const fs = require('fs');
const http = require('http');
const path = require('path');

module.exports = {
  createServer
};

function createServer(options) {
  const defaultUrl = options.defaultUrl;
  const rootPath = path.resolve(options.root);

  return http.createServer(handleRequest);

  function handleRequest(request, response) {
    const filePath = rootPath + getUrl(request.url);

    fs.readFile(filePath, (err, data) => {
      if (err) {
        response.writeHead(404);
        response.end('Not Found');
      } else {
        response.end(data);
      }
    });
  }

  function getUrl(url) {
    if (url === '/') {
      return url + defaultUrl;
    }

    return url;
  }
}
