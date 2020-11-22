

Symbol的作用？

Symbol具体唯一性。可以用作对象的key，对象的私有属性；代表 EOF ...

---

动画与手势

如何使用JS来实现动画？
帧的概念

几种处理帧的方案？
``` js
// 比较不可控，不确定浏览器到底会不会正确的按照16毫秒去执行
// 会发生积压现象，不管是否执行完毕，都会放进 interval 队列，取决于浏览器底层实现
setInterval(() => {}, 16)

let tick = () => {
  setIimeout((tick, 16)
}

// 申请浏览器执行下一帧的时候来执行代码
// 降帧降频的操作
let tick = () => {
  let handler = requestAnimationFrame(tick)
  // cancelAnimationFrame(handler)
}
```

动画库的实现？
将执行自身的 tick 包装成 Timeline

动画的分类？
属性动画、帧动画。前端一般做的是属性动画

Animation的设计？

动画变化的对象、属性、起始值、终止值、时间间隔、时间曲线；
动画变化的逻辑 receiveTime


t t0关系
this[START_TIME] 保存每一个 animation 的 startTime
将 tl 挂到 window 上

动态的向一个 Timeline 添加一个 animation

想办法处理 pause 的逻辑

resume

如何实现 pause、resume？

记录暂停开始时间、暂停截止时间，计算暂停的时间，重新开始动画时，减去暂停的时间得到动画执行时间 t。

如何实现 delay、timingFunction？

计算 t 时减去 delay，当 t > 0 时，执行 animation.receive。
将 time/this.duration 传入 this.timingFunction 计算 progress。

缓动效果全部是由三次贝塞尔曲线构成；ease linear ease-in ease-out ease-in-out 是三次贝塞尔曲线 不同参数的结果。
三次贝塞尔曲线是用牛顿积分算的。
 
如何实现 reset ？

暂停时间线，重置时间线状态。

时间线的状态管理？

编写各个方法执行时的状态


