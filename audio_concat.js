/*
 * @Author: lixiang 
 * @Date: 2018-09-30 15:01:55 
 * @Last Modified by: lixiang
 * @Last Modified time: 2018-09-30 15:17:00
 */


var ffmpeg = require('fluent-ffmpeg');
var { config } = require('./config');

// 合并文件
function audio_concat(inputPath, outputPath) {
  ffmpeg()
    //设置环境变量,添加 PATH 即可
    .setFfmpegPath(config.ffmpegPath)
    .setFfprobePath(config.ffprobePath)
    .setFlvtoolPath(config.flvtoolPath)
    .input(config.concatStartFile)
    .input(inputPath)
    .input(config.concatEndFile)
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
    .mergeToFile(outputPath);
}
exports.audio_concat = audio_concat