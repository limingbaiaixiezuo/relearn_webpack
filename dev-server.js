const fs = require('fs');
const exec = require('child_process').exec;

// 读取上次使用的端口号
const portFilePath = './.dev-port';
let port = 3000; // 默认端口号
if (fs.existsSync(portFilePath)) {
  port = parseInt(fs.readFileSync(portFilePath, 'utf8')) + 1;
}

// 更新端口号文件
fs.writeFileSync(portFilePath, port.toString());

// 启动开发服务器
const command = `PORT=${port} npm run dev`;
const process = exec(command);

process.stdout.on('data', (data) => {
  console.log(data);
});

process.stderr.on('data', (data) => {
  console.error(data);
});
