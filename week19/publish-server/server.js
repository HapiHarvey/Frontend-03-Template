let http = require('http')
let https = require('https')
let unzipper = require('unzipper')
let querystring = require('querystring')
// 2. auth路由：接受code，用code+client_id+client_secret换token

function auth (request, response) {
  let query = querystring.parse(request.url.match(/^\/auth\?([\s\S]+)$/)[1])
  getToken(query.code, function (info) {
    // response.write(JSON.stringify(info))
    response.write(`<a href='https://localhost:8083/?token=${info.access_token}>publish</a>`)
    response.end()
  })
}

function getToken (code, callback) {
  let request = https.request({
    hostname: 'github.com',
    path: `/login/oauth/access_token?code=${code}&client_id=Iv1.f6f8b85c6045f4b7&client_secret=6656bcc492dbdc695772a96c0881b6d346edf0ea`,
    port: 443,
    method: 'GET'
  }, function (response) {
    let body = ''
    response.on('data', chunk => {
      body += chunk.toString()
      return
    })
    response.on('end', chunk => {
      callback(querystring.parse(body))
      return
    })
    
    console.log(response)
  })
  request.end()
}
// 4.  publish路由：用token获取用户信息，检查权限，接受发布

function publish (request, response) {
  let query =  querystring.parse(request.url.match(/^\/publish\?([\s\S]+)$/)[1])

  getUser(query.token, info => {
    // 应该接一个权限系统
    if (info.login === 'HapiHarvey') {
      request.pipe(unzipper.Extract({ path: '../server/public' }))
    }
  })
  
  //https://api.github.com/user
  // request.pipe(outFile)
  
  // request.pipe(unzipper.Extract({ path: '../server/public/' }))
}

function getUser (token, callback) {
  let request = https.request({
    hostname: 'api.github.com',
    path: `/user`,
    port: 443,
    method: 'POST',
    headers: {
      Authorization: `token ${token}`,
      "User-Agent": 'toy-publish'
    }
  }, function (response) {
    let body = ''
    response.on('data', chunk => {
      body += chunk.toString()
    })
    response.on('end', chunk => {
      callback(JSON.parse(body))
    })
    
    console.log(response)
  })
  request.end()  
}

http.createServer(function(request, response) {
  if (request.urlmatch(/^\/auth\?/))
    return auth(request, response)
  if (request.urlmatch(/^\/auth\?/))
    return publish(request, response)

}).listen(8082)

