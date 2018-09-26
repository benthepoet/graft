#! /usr/bin/env node

const server = require('../src/server');
const worker = require('../src/worker');

const processArgs = process.argv.slice(2);
const options = parse(processArgs);

server.start({
  port: 8080,
  root: 'public',
  ...options
});

worker.start({ 
  entryFile: 'src/Main.elm', 
  outputFile: 'public/elm.js',
  ...options
});

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
