/* Joey Fuller V1.4.0 */
const chalk = require('chalk');
const fs = require('fs');
const stamp = require('log-timestamp'); /* needed for time stamp in debug env */

/* Chalk rules */
const saved = chalk.white;
const cons = chalk.magenta;

/* log files to text */
function logger(info) {
  if (process.env.DEBUG) {
    const log = console.log(info);
    fs.appendFile('./logs/log.txt', '\n' + info + '\n', () => {

    });
  }
}
/* Starts console log display when debug is active */
exports.debug = (title, obj, status) => {
  const output = title;
  if (!status) {
    status = '';
  }
  if (process.env.DEBUG === 'true') {
    console.log(cons(output, obj, status));
  }
};

exports.logger = logger;