"use strict";
var pp = require('preprocess');

if (process.argv.length < 4) {
  console.log('preprocess <input file> <output file>');
  process.exit();
}
if (process.argv.length > 4) {
  process.exit();
}

var len = process.argv.length;
console.log(len, process.argv[len-2] + ' --> ' + process.argv[len-1]);
pp.preprocessFileSync(process.argv[len-2],process.argv[len-1],process.env);
