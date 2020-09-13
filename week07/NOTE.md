
## 总结

### HTML实体

- xhtml-lat
- xhtml-symbol
- Xhtml-special

实体`&nbsp`代表`non-break space`，不间断空格可以避免一些内容因换行而被分开。

不能用来表示多个空格，使用`pre`标签或者指定`white-space: pre`属性来展示内容。（其空白会被浏览器保留）


### HTML标签语义

当没有合适的标签或者并不了解合适的标签时，可以使用class作为补充  eg. `<p class="note"></p>`

`strong`表示词在文章中的重要性，`em`表示这个词在句子里面的重音

标签组`figure`、`figcaption`可表示图表及其下面的说明文字

`ol`跟`ul`的区别是，这个列表在语义上是否具有顺序性

`nav`表示具有导航性质区域

`dfn`表示这里包含这个词的定义

`pre`表示这里是一段格式预先处理好的文本



### 浏览器API

`broswer api`

- DOM
- BOM
- 其他


Node、Element的继承关系


API分类

- 导航类操作：节点导航、元素导航
- 高级操作：`compareDocumentPosition`、`contains`、`isEeualNode`...



迭代器API：没有什么实际的用途，API设计风格过于老旧，处于被废弃的状态


事件API

Event的触发: 先捕获再冒泡；同一元素上的事件监听，先来的先触发。


RangeAPI：DOM树操作的一个万能API，可以对DOM树进行精确的操作。


### CSSOM

CSSOM View

`window.devicePixelRatio` 屏幕上的物理像数跟代码里面的逻辑像素px的比值

由`window.open`创建的新窗口，可以通过`window.resizeBy`控制窗口尺寸，通过`window.moveBy`控制位置

