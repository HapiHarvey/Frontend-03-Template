let http = require('http')
let archiver = require('archiver')
let child_process = require('child_process')
let querystring = require('querystring')

let fs = require('fs')

//1. 打开 https://github.com/login/oauth/authorize

child_process.exec(`open https://github.com/login/oauth/authorize?client_id=Iv1.f6f8b85c6045f4b7`)

//3. 创建server，接受token，后点击发布

http.createServer(function(request, response) {
  let query = querystring.parse()
  publish(query.token)
}).listen(8083)


function publish (token) {
  let request = http.request({
    hostname: '81.68.241.91',
    port: 8002,
    method: "POST",
    path: '/publish?token=' + token,
    headers: {
      'Content-Type': 'application/octet-stream', // 常见的流式传输的内容类型 深入了解见 HTTP 的 RFC标准
      // 'Content-Length': stats.size
    }
  }, response => {
    console.log(response);
  });
}
/*


const archive = archiver('zip', {
  zlib: { level: 9 } // Sets the compression level.
})

archive.directory('./smaple/', false)

archive.finalize()

// archive.pipe(fs.createWriteStream("tmp.zip"))
archive.pipe(request)
*/