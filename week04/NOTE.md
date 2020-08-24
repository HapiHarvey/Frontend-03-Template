

##  Q & A

Q：什么是CSS计算？

A：收集CSS规则，DOM关联上CSS规则，生成computedStyle；对于选择器匹配到多条规则，根据`specificity`和后来优先规则覆盖。

Q: 什么是CSS Layout？

A：根据CSS规则（布局属性），计算每一个DOM的在屏幕上的位置。即由DOM上的`computedStyle`（`display`，`position`）计算为`style`(`top`、`left`、`width`, `height`...)。

Q：什么时候执行layout？

A：flex布局需要知道子元素，读取子元素发生在标签的结束标签之前

CSS包含三代排版技术：正常流、flex、grid

---

## CSS Layout过程

预处理：处理掉`flexDirection`和`wrap`相关属性，将具体的 `width`, ..., `top`抽象成main cross相关属性


`AutoMianSize`模式：父元素没有设置宽度，由子元素撑开。


分行

- 根据主轴尺寸，把元素分进行
- 若设置了no-wrap，则强行分配进第一行



计算交叉轴方向 

- 根据每一行最大元素尺寸计算行高
- 根据行高`flex-align`和`item-align`，确定元素具体位置



- 绘制需要一个图形环境
- 我们这里采用了npm包images
- 绘制在一个`viewport`上进行
- 与绘制相关的属性：`background-color`、`border`、`background-image`等



- 递归调用子元素的绘制方法完成DOM树的绘制
- 忽略一些不需要绘制的节点
- 实际浏览器中，文字绘制是难点，需要依赖字体库
- 实际浏览器中，还会对一些图层做compositing

---

## 总结

以flex布局规则为例，了解浏览器是如何根据CSS规则来对DOM元素进行排版的。