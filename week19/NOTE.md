
发布系统模型？

单机同级部署发布服务器和线上服务器

公司的线上服务系统

已经有node服务器，是一个集群状态；前后端混布的，前端写完代码交给后端去进行部署。

线上服务系统：监控、错误恢复、线上重启。

---

部署策略：

1. 不建议在 server 上再进行 npm install，因为包的数量非常的多，不能保证所有的包都遵循 semantic version 的原则 

2. 利用 package.json.lock

发布服务怎么构成？

由 发布的服务器端 和 发布工具 构成的

publish server 负责向真实的 server 去copy文件，向 publish server 去发送发布的文件

---

pulish tool 到 publish server 之间的传输就是典型的流式传输

Node.js 中的流？流式传输

分为 可读流、可写流、可读写流

writable.write 不是一个同步的API，但是可以连续调用；如果连续调用时，前一个流还没写完，就会排队去处理。
buffered 就是已经缓存起来了

Event: 'drain'：表示已经将调用 write 写入的数据都写完了

http.request 属于一个 stream

---

发布策略，发布链路

发布工具 到 发布系统，再到 线上服务

22
3000 
8002 发布服务

---

pubish tool 的功能？

登录鉴权、打包

Github App  Githubb Auth