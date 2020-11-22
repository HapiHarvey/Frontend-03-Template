
手势模型？

手势参数，passive，是否异步同步

如何区分不同按键的down、up？

event.button 表示触发事件的按键

使用掩码，位移操作循环5种按键

如何处理鼠标两个键同时按下，导致mousemove、mouseup监听事件重复绑定？

使用模块变量 isListeningMouse 控制

如何做事件的派发和处理？

自定义DOM事件 event

如何实现 flick 事件？

存储一段时间内的点，来计算平均的速度；每次移动，先过滤出半秒内的点，推入新的点；end时计算速度；当速度 像数/毫秒 > 1.5 时则触发 flick.

如何对手势做封装？

由于 element 还是写死的

使用解耦的方式：listen  => recognize => dispatch

封装成class