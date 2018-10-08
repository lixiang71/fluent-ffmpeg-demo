/*
 * @Author: lixiang 
 * @Date: 2018-09-30 15:00:18 
 * @Last Modified by: lixiang
 * @Last Modified time: 2018-09-30 15:20:31
 * 
 * 使用
 * 打开终端运行 node split.js ${user}
 * user 指用户编号
 */


var ndir = require('ndir');
//path模块
var path = require('path');

var { config } = require('./config');
var { audio_silenceremove } = require('./audio_silenceremove');
var { audio_split_duration } = require('./audio_split_duration');
var { audio_concat } = require('./audio_concat');

/**
 * 获取命令行参数
 * 类型 Array
 * 
 * config.dirName 测试数据目录
 * NewDirName 输出文件目录
 */
const arguments = process.argv.splice(2);
const Fn = arguments[0];
const NewDirName = `testData_${arguments[0]}`


/**
 * 读取测试数据目录，调用ffmpeg方法，处理音频
 * Fn 根据命令行参数，调用相应的方法
 */
ndir.walk(`./${config.dirName}/`, function onDir(dirpath, files) {
  if (path.basename(dirpath) !== config.dirName) {
    for (let i = 0, l = files.length; i < l; i++) {
      let info = files[i];
      if (info[1].isFile()) {
        // 输入文件路径
        let dirPath = `${config.dirName}/${path.basename(dirpath)}/${path.basename(info[0])}`;
        // 输出文件路径
        let newDirPath = `${NewDirName}/${path.basename(dirpath)}/${path.basename(info[0])}`
        // 判断命令行参数值
        switch (Fn) {
          case 'concat':
            // 合并音频
            audio_concat(dirPath, newDirPath);
            break;
          case 'silenceremove':
            // 去除头尾静音
            audio_silenceremove(dirPath, newDirPath);
            break;
          case 'split_duration':
            // 截取指定时间段的音频
            audio_split_duration(dirPath, newDirPath);
            break;
          default:
            break;
        }
      }
    }
  }
}, function end() {
  // console.log('walk end.');
}, function error(err, errPath) {
  // console.error('%s error: %s', errPath, err);
});
