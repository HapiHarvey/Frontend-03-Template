
代码见
---

组件化的state可以是组件的属性，也可以是render的局部变量

数论里的知识，取余运算

Xxx，这个就很烦

如何将轮播动画与手势操作结合起来？

拖的时候位置不对，没有考虑pan时的偏移量。
拖拽时动画暂停了，但是拖拽时没有考虑动画的偏移量。

Panend时重新启动时间线

取整、取500的倍数

没有设position的值，轮播图可能会跳

如何让轮播图响应 flick 事件？


---

添加更多属性

看render里，有timeline、position局部变量
position代表组件当前一个状态，不仅对内部函数有用，对用户也是有用；
将一些属于组件的状态和方法放回到组件中，setAttribute position

如何将position放到component中？将positon改造到component state中？

```js
import {component, STATE, ATTRIBUTE} from './framework.js'
//...
export {STATE, ATTRIBUTE} from './framework.js'

```