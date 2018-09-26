const chokidar = require('chokidar');
const elm = require('node-elm-compiler');
const path = require('path');

module.exports = { start };

function compile(filePath, { outputFile }) {
  const compileOptions = {
    output: path.resolve(outputFile)
  };
  
  return elm.compile(filePath, compileOptions);
}

async function start({ entryFile, ...options }) {
  const entryFilePath = path.resolve(entryFile);
  const watchPath = path.dirname(entryFilePath);
  
  const recompile = () => compile(entryFilePath, options);
  
  chokidar
    .watch(watchPath)
    .on('change', recompile)
    .on('ready', recompile);
}