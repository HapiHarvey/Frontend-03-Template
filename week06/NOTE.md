
## 作业

在 CSS 脑图上对 CSS 的属性进行分类，脑图提交至 GitHub

由于w3c网络连接慢，爬虫代码未能帮助我及时爬到标准，并将CCS属性按标准分类，脑图后续补充。

暂时用截图代替成果，按标准分类的CSS属性


## 总结

BFC：从上往下排布行盒或块盒
IFD：从左往右排布文字和行内盒


### CSS行模型

- `text-top` `text-bottom`随字体大小
- 多种不同字体混排，由最大的一个字体决定`text-top` `text-bottom`
- 行高大于文字高度时，有`line-top` `line-bottom`
- 盒的先后顺序和尺寸都影响`line-top` `line-bottom`位置


如果盒从`text-bottom`去对齐，就可能将高度撑开。

不建议给行内盒使用基线对齐，因为其基线会因为行内盒里的文字而变化。


### 块级排布

float与clear

float会影响生成的行盒尺寸

`clear: right`意思是找一块足够的空间来排布浮动元素

`float`可以用来实现图文混排的效果，使用`flex-box`来对盒子进行排布。


`Margin Collapse` 留白折叠 边距折叠: 上下排布的两个带margin的盒子，并不是把两个margin的空白都留出来，而是会让它们两个去发生一个堆叠的现象，叠出来的高度跟最大的margin高度相等。

在排版中，任何一个元素产生的盒模型里面，它的所谓的margin只是要求周围有这么多的空白，而不是说跟其他边距有这么大的空白。

这个现象只会发生在BFC中，不会发生在IFC或者flex、grid。

正常流只有BFC会发生边距折叠。


面试里的问题，就是float、边距折叠、BFC三个现象的叠加。


### BFC合并

Block相关概念

Establish BFC 设立BFC


Block box && overflow: visible

里外都是BFC，且overflow: visible，会发生BFC合并

​	BFC合并与float

​	BFC合并与边距折叠


---

抛物线在平时的开发里非常有用。（本质上是两个要素控制的  运行）

例如：摩擦停止、iphone一划逐渐停止scrow、弹簧的回弹行为

W3C规定颜色使用HSL表示法（色相、饱和度、明度）。


### 绘制

包含：几何图形、文字 、位图

绘制图形的方法：data url  + svg 使用inline-svg



