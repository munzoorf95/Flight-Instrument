"use strict";

var pp = require('preprocess');

if (process.argv.length < 4) {
  console.log('preprocess <input file> <output file>');
  process.exit(1);
}
if (process.argv[2] === process.argv[3]) {
  console.log('preprocess <input file> <output file>');
  console.log('<input file> cannot be same as <output file>');
  process.exit(1);
}
console.log(process.argv[2] + '-->' + process.argv[3]);
pp.preprocessFileSync(process.argv[2],process.argv[3],process.env);
