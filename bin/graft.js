#! /usr/bin/env node

const server = require('../src/server');

const MODES = ['build', 'serve'];

const [mode, ...processArgs] = process.argv.slice(2);

if (!MODES.includes(mode)) {
  throw new Error('Invalid mode specified.');
}

const defaults = {
  elm: {
    pathToElm: './node_modules/elm/bin/elm'
  },
  defaultUrl: 'index.html',
  root: './src',
  port: 8580
};

const options = Object.assign({}, defaults, parse(processArgs));

switch (mode) {
  default:
    server.start(options);
}

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
