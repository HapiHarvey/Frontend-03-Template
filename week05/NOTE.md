## 思考

Q：为什么 first-letter 可以设置 float 之类的，而 first-line不行呢？

A: 未查阅到相关资料，以下个人思考。首字母属于块级元素的一部分，可以设置首字母float属性，正常流可以根据此元素重新排版，展示首字母被环绕的效果。

原first-line元素设置float后，元素状态不再属于first-line，语义上会导致冲突；在正常流中，原本的第二行元素应该会变为首行元素，继而获得float相关属性，最后导致整个块级元素（段落）都

受first-line影响，与first-line伪类只控制文本首行的意义冲突。


## 记录

标准状态：`working draft` `REC`

如何判断一个标准？ 从这个标准的实现状态，和更新频率考虑。

---

at-rule知识框架，各种at-rule的含义、用法和使用场景

`selector`的产生式

`css-variables `的例子

`css-value`

---

- CSS语法
- at-rule
- selector
- variables
- value
- 实验


HTML带有命名空间，访问svg里的a标签，需要用`svg|a`；竖线代表命名空间的分隔符。

`[attr=value]` `[attr~=value]`支持拿空格分隔的值的序列

树结构伪类破坏回溯原则的特性，浏览器实现的不好，本身性能不好。 