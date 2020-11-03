

---

如何理解对象与组件？组件包含什么？

Attribute 与 Property 的区别？

如何设计组件状态？

组件的生命周期？

组件的 children 类型？

怎么理解proxy? 是什么？有什么用？使用要注意什么

`强大且危险`的设计，用来 proxy 的代码预期性会变差；专门为底层库为设计的一种特性。
proxy对象是一种特殊的对象，其所有的行为都是可以重新去指定的，使用了proxy的对象，可预测性会降低。

怎么实现reactive，有什么需要注意的？Vue里的reactive的实现原理？

使用proxy来实现。reactive 与 effect 之间的连接

怎样知道一个函数引用了什么变量？是怎样进行依赖收集的？

通过调用一下这个函数，看看实际用了哪些变量。若函数引用了reactive对象, 就有办法在reactive get中获得监听的效果。

怎样对级联对象做reactivity？

在代理的`get`中，当`obj[prop]`是一个`object`时，套一个`reactive`。
`po.a.b`访问到的`proxy`与 调用那一遍访问到的 不一样，需要一张全局的表格保存。

对比vue的reactive，有什么不同？

vue中reactivity有什么用，或这个概念有什么用？ 是怎样做零代码的？

所写的代码仅仅是对它的变量和值进行一下简单的绑定关系，再配合一定的语法糖入 build compiler，我们完全可以把它变成一个零代码的双向绑定的模式。
双向绑定的强大之处，在很多时候不需要使用代码即可实现交互。

响应式对象是什么？

一个可监听的对象。

如何实现拖拽效果？监听什么事件，避免什么问题？

在正常流中实现拖拽。
希望元素完全跟随着鼠标进行移动，使用 drap 事件是做不到的，必须使用 mousedown mouemove mouseup 事件来模拟。
mousemove mouseup 必须在document上监听。因为如果在元素上监听，拖拽过程中移出元素范围，会导致 mousep mousemove 失效。


---

低代码的实现: reactivity， 函数式 compose

第三次直播

书籍介绍：DOM编程艺术，进阶营，周爱民第三版javascript

编程珠玑？怎么看

函数式编程看什么书？

方向前端服务化，后端服务化，可关注serverles理论的产品
Low code处于萌发期

不建议学源码，效率低。简易跑起来，打断点调试着看