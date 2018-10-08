const config = {
  ffmpegPath: "D:/ffmpeg/bin/ffmpeg.exe",
  ffprobePath: "D:/ffmpeg/bin/ffprobe.exe",
  flvtoolPath: "D:/ffmpeg/bin/ffplay.exe",
  dirName: "testData", // 测试数据目录
  distance: "1", // 测试语音的间距，用于拼接生成的文件，如 100070007
  concatStartFile: "audio/start.wav", // 合成语音的开头文件
  concatEndFile: "audio/end.wav", // 合成语音的结尾文件
  // 临时需要用到的文件夹
  mkdirNames: [
    'testData_silenceremove',
    'testData_split',
    'testData_concat',
    // 最终处理好的数据存放目录
    'testData_split_duration'
  ]
}


exports.config = config
