const server = require('./src/server');

const processArgs = process.argv.slice(2);

const defaults = {
  defaultUrl: 'index.html',
  root: './src',
  port: 8580
};

const options = Object.assign({}, defaults, parse(processArgs));

server
  .createServer(options)
  .listen(options.port, ready);

function parse(args) {
  const options = {};
  const argPattern = /^--(\w+)\=(\w+)$/;

  args
    .filter(arg => argPattern.test(arg))
    .map(arg => arg.slice(2).split('='))
    .forEach(([key, value]) => {
      options[key] = value;
    });

  return options;
}

function ready(error) {
  const self = this;

  if (error) {
    throw error;
  }

  console.log('Server Ready', self.address());
}
