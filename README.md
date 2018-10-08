## 使用
### step1
创建目录，需要先根据测试语音目录创建相同的文件结构
```bash
node mkdir.js
```
### step2
把长音频文件截成100个单独文件，用户编号根据情况定义
```bash
node split.js 0001
```
### step3
去除噪音
```bash
node index.js silenceremove
```
### step4
给音频文件头和尾增加静音
```bash
node index.js concat
```
### step5
截取4.2秒
```bash
node index.js split_duration
```

## 关于ffmpeg 的一些命令

### 截取音频
  -ss 开始截取的时间点
  -t 截取音频时间长度
  -acodec copy output.wav 重新编码并复制到新文件中

  ```
  ffmpeg -i 5000280001.wav -vn -acodec copy  -ss 00:00:01.3 -t 00:00:02.75 output.wav
  ```

### 音频合并(两个音频会重叠)
  ```
  ffmpeg -i first.mp3 -i second.mp3 -filter_complex amix=inputs=2:duration=first:dropout_transition=2 -f mp3 third.mp3
  ```

### 两个音频拼接
  ```
  ffmpeg -i 5000280001.WAV -i 5000280001.wav -filter_complex "[0:0] [1:0] concat=n=2:v=0:a=1 [a]" -map [a] concat.wav
  ```

### 三个音频拼接
  ```
  ffmpeg -i 片头.wav -i 内容.WAV -i 片尾.wav -filter_complex "[0:0] [1:0] [2:0] concat=n=3:v=0:a=1 [a]" -map [a] 合成.wav
  ```
	
### 去除头尾静音
  ```
  ffmpeg -i testData/0044/3300440020.wav -y -af silenceremove=1:0:-40dB:-1:0:-40dB silenceremove.
  ```