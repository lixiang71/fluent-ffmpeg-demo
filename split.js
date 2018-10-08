/*
 * @Author: lixiang 
 * @Date: 2018-09-30 15:01:06 
 * @Last Modified by: lixiang
 * @Last Modified time: 2018-09-30 15:19:18
 * 
 * 使用
 * 打开终端运行 node split.js ${user}
 * user 指用户编号
 */


var ffmpeg = require('fluent-ffmpeg');
var { config } = require('./config');

/**
 * 获取命令行参数
 * 类型 Array
 * 
 * user 用户编号
 * distance 测试录音间距 单位（米）
 */
const arguments = process.argv.splice(2);
const user = arguments[0];
const distance = config.distance;


/**
 * 音频文件截取成100个小文件
 *
 * @param {*} inputPath 输入文件路径
 * @param {*} outputPath 输出文件路径
 * @param {*} seek 开始时间 毫秒
 * @param {*} duration 持续时间 毫秒
 */
function audio_split(inputPath, outputPath, seek, duration) {
  ffmpeg()
    //设置环境变量,添加 PATH 即可
    .setFfmpegPath(config.ffmpegPath)
    .setFfprobePath(config.ffprobePath)
    .setFlvtoolPath(config.flvtoolPath)
    .input(inputPath)
    .seek(seek)
    .duration(duration)
    .on('start', function (command) {
      console.log(command)
    })
    .on('error', function (err, stdout, stderr) {
      console.error('Error:', err)
      console.error('ffmpeg stderr:', stderr)
    })
    .on('end', function (output) {
      console.log(outputPath + ' ~ Audio created')
    })
    .saveToFile(outputPath)
}


// 调用
var start = 0;
var fileName = null;

for (var index = 0; index < 100; index++) {
  // audio_split('./start.wav', `${element}`,)
  start = 3.5 * index
  end = start + 3.5
  if (parseInt(index + 1) < 10) {
    fileName = '000' + parseInt(index + 1)
  } else if (parseInt(index + 1) > 9 && parseInt(index + 1) < 99) {
    fileName = '00' + parseInt(index + 1)
  } else if (parseInt(index + 1) > 99) {
    fileName = '0' + parseInt(index + 1)
  }
  audio_split(`audio/${user}.wav`, `testData_split/${user}/${distance}${user}${fileName}.wav`, start, 3.5)
}