const fs = require('fs');
const http = require('http');

module.exports = {
  createServer
};

function createServer(options) {
  return http.createServer(handleRequest);

  function handleRequest(request, response) {
    const path = options.root + request.url;

    fs.access(path, fs.constants.F_OK, err => {
      response.end(err ? 'File not found' : 'File found');
    });
  }
}
