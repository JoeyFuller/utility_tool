/* Joey Fuller */
const expect = require('chai').expect;
const chalk = require('chalk');
const fs = require('fs');

/* chalk rules */
const success = chalk.magenta;
const error = chalk.red;

describe ('logging', () => {
  it('Logging tool successful?', () => {
    console.log(success('Yes it is working!'));
  });
  it('Are there errors?', () => {
    console.error(error('Error testing working!'));
  });
});

fs.appendFile('./logs/logFile.log', function () {
  console.log('Data logged!');
});
