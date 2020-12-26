
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


---

## 无头浏览器检查DOM
