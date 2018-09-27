const chokidar = require('chokidar');
const elm = require('node-elm-compiler');
const path = require('path');

module.exports = { compile, start };

function compile(options) {
  const compileOptions = {
    output: path.resolve(options.output)
  };
  
  return elm.compile(path.resolve(options.entry), compileOptions);
}

async function start(options) {
  const watchPath = path.dirname(path.resolve(options.entry));
  const recompile = () => compile(options);
  
  chokidar
    .watch(watchPath)
    .on('change', recompile)
    .on('ready', recompile);
}