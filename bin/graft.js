#! /usr/bin/env node

const bundler = require('../src/bundler');
const server = require('../src/server');

const [mode, argv] = process.argv.slice(2);
const options = parse(argv);

switch (mode) {
  case 'build':
    bundler.compile(options);
    break;

  case 'serve':
    bundler.start(options);
    server.start(options);
    break;

  default:
    console.log('Invalid mode specified.');
}

function parse(args) {
  const options = {};
  const argPattern = /^--(\w+)\=([a-zA-Z0-9\/\.]+)$/;

  args
    .filter(arg => argPattern.test(arg))
    .map(arg => arg.slice(2).split('='))
    .forEach(([key, value]) => options[key] = value);

  return options;
}
