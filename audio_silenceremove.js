/*
 * @Author: lixiang 
 * @Date: 2018-09-30 15:02:08 
 * @Last Modified by: lixiang
 * @Last Modified time: 2018-09-30 15:17:49
 */


var ffmpeg = require('fluent-ffmpeg');
var { config } = require('./config');

// 合并文件
function audio_silenceremove(inputPath, outputPath) {
  ffmpeg()
    //设置环境变量,添加 PATH 即可
    .setFfmpegPath(config.ffmpegPath)
    .setFfprobePath(config.ffprobePath)
    .setFlvtoolPath(config.flvtoolPath)
    .input(inputPath)
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
    .audioFilters('silenceremove=1:0:-55dB:-1:0:-55dB')
    .saveToFile(outputPath);
}
exports.audio_silenceremove = audio_silenceremove

