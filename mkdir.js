/*
 * @Author: lixiang 
 * @Date: 2018-09-30 15:00:55 
 * @Last Modified by: lixiang
 * @Last Modified time: 2018-09-30 15:53:27
 */


var ndir = require('ndir');
//path模块
var path = require('path');

var { config } = require('./config');

config.mkdirNames.forEach(element => {
  ndir.walk(`./${config.dirName}/`, function onDir(dirpath, files) {
    if (path.basename(dirpath) !== config.dirName) {
      ndir.mkdir(`${element}/${path.basename(dirpath)}`, function (err) {
        if (err) {
          throw err;
        }
        console.log(`mkdir success → %c ${element} `);
      });
    }
  }, function end() {

  }, function error(err, errPath) {
    console.error('%s error: %s', errPath, err);
  });
});
