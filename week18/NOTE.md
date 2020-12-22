
常用的测试框架和断言库？

- 测试框架：macha、jest
- 断言库：assert

如何让测试能够适用标准？

add 必须写成 node 模块的这个问题。
问题主要在 module.exports 上，正常思路是先将测试代码build，然后对dist目录的构建结果做测试；但这样会导致测试代码也依赖build，是不好的实践；而在code coverage，如果 test 依赖 dist 里，又会添加其他的麻烦。

使用 babel register 
``` sh

mocha --require @babel/register

# error: MODULE_NOT_FOUND
./node_modules/.bin/mocha -require @babel/register

```

最佳实践都是调用 local 的工具，依赖机器环境是一个坏习惯

怎么计算 code coverage?

表示测试覆盖了原文件里面的哪些代码

istanbuljs/nyc

主要看行覆盖的覆盖率；作用是可以在一个复杂的文件里计算出最终它测试的覆盖的比例。

---

对 HTML Parser 做单元测试

HTML Parser 的输入输出比较明确，容易做单元测试。

package.json 中的 scripts 和 devDependencies 可以集成到工具链中。

!! 工作流程？工作方式

环境搭起来了，程序(程序、命令行程序)能正常运行

vscode 调试测试用例程序，由于使用了 babel，调试代码断点位置不对？

需要配一下它的 sourceMaps: lauch.json .babelrc

如何判断 sourceMaps 是否成功？

1) 查看 CallStack  _compile 最后编译出来的 newCode 包含 sourceMappingURL=data:application/json;charset=utf8;base64,......

2) top.children.push(currentTextNode) 两个调用都可以打断点

这个版本的 vscode 和 babel 的这种依赖的 register 存在问题，只能打断点，无法单步执行。

---

所有工具与 generator 的集成