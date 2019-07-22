const path = require('path');

module.exports = {
  outputPath: path.resolve(__dirname, '..', 'dist'),
  entryPath: path.resolve(__dirname, '..', 'src/index.js'),
  stylePath: path.resolve(__dirname, '..', 'src/styles'),
  templatePath: path.resolve(__dirname, '..', 'src/index.html'),
};
