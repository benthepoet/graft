#! /usr/bin/env node

const bundler = require('../src/bundler');
const server = require('../src/server');

const processArgs = process.argv.slice(2);
const options = parse(processArgs);

bundler.start(options);
server.start(options);

function parse(args) {
  const options = {};
  const argPattern = /^--(\w+)\=([a-zA-Z0-9\/\.]+)$/;

  args
    .filter(arg => argPattern.test(arg))
    .map(arg => arg.slice(2).split('='))
    .forEach(([key, value]) => options[key] = value);

  return options;
}
