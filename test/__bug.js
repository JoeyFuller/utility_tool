/* Joey Fuller */
const expect = require('chai').expect;
const chalk = require('chalk');
const fs = require('fs');

/* chalk rules */
const success = chalk.magenta;
const error = chalk.red;
const warn = chalk.orange;

describe ('logging', () => {
  it('Logging tool successful?', () => {
    console.log(success('Yes it is working!'));
  });
  it('Are there errors?', () => {
    console.error(error('Error testing working!'));
  });
  it('Does it warn?', () => {
    console.warn(warn('Yes it will warn you!'));
  });
});

fs.appendFile('./logs/logFile.log', function () {
  console.log('Data logged!');
});
