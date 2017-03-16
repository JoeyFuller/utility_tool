/* Joey Fuller */

/* dependencies */
require('log-timestamp');
const fs = require('fs');

/* tests */
exports.debug = (title, type) => {
  if (process.env.DEBUG) {
    if(type == 'warn'){
        console.warn(warn(title, type))
    } else if (type == 'error'){
        console.error(error(title, type))
    } else {
        console.log(success(title, type))
    }
  };
}
