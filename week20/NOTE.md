
## 持续集成的概念

对于客户端工程师来说，其实是对于一个最终阶段集成的。前面各自开发，最终集成联调。客户端主要的开发方式。

客户端的持续集成，包含两个概念

- daily build: 服务端的代码，在每天晚上的时候，进行一次全局的build
- BVT - build veritication test：构建的验证测试，冒烟测试

前端的持续集成

- 时间短：以周计的上线周期，几个小时到三天上线
- 在提交的时候 build 和 基本验证
- 应该选用更加轻量级的bvt，如 lint

去做持续集成，可以利用无头浏览器生成DOM树，检查DOM，完成 BVT

---

## Git Hooks

pre-commit: lint 

pre-push: check

---

## ESLint

代码风格检查工具

pre-commit 检查的文件当前的版本，那怎么才能够让 pre-commit 检查的是将要提交的那个版本，而不是当前文件修改的版本？

- eslint只管当前目录里的所有文件
- 涉及git的一个概念 git stash push -k / git stash pop
- 将 stash push / stash pop 一对命令的执行放到 pre-commit 中

---

## 无头浏览器检查DOM

chrome 无头浏览器模式

puppeteer 是一个Node库，提供一个高级API来通过 DevTools 协议控制 Chromium 或 Chrome。 Puppetter 默认以 headless 模式运行。

可以利用 puppeteer 的 DOM 的能力，进行一些代码的规则检查：
- 将图片取出来，编辑检查规则
- 将各种不同的内容取出来
- 可以用于单元测试，但是用于单元测试过于重；单元测试让它尽量在一个纯JS引擎的环境里完成；牵涉到DOM时，可以进行单独的单元测试


## 总结

Git Hooks，ESLint，Puppeteer 都可以使用JS编写逻辑，也能互相调用，可基于此构建一个强有力的持续集成的体系。

帮助保证项目质量，还可以把 lint 和 无头浏览器 放到服务端去执行，变成一个强制标准，放到客户端是辅助工具。