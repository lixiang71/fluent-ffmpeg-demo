/*
 * @Author: lixiang 
 * @Date: 2018-09-30 15:02:24 
 * @Last Modified by: lixiang
 * @Last Modified time: 2018-09-30 15:18:38
 */


var ffmpeg = require('fluent-ffmpeg');
var { config } = require('./config');

// 截取指定期间音频
function audio_split_duration(inputPath, outputPath) {
  ffmpeg()
    //设置环境变量,添加 PATH 即可
    .setFfmpegPath(config.ffmpegPath)
    .setFfprobePath(config.ffprobePath)
    .setFlvtoolPath(config.flvtoolPath)
    .input(inputPath)
    .duration(4.2)
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

exports.audio_split_duration = audio_split_duration
