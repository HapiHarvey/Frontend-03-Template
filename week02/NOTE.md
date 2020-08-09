
## 浏览器工作原理

打开网页发生了什么？

整个过程就是从 URL 转换 为 Bitmap 的过程，经过5个步骤来完成整体的渲染。

有限状态机处理字符串，是在browser里面贯穿始终的一个技巧。


## 状态机

有限状态机：每一个 状态都是机器；每一个机器知道下一个状态。

不使用状态机处理字符串，找到`"a"、"ab"、"abcdefg"`。

关键思路是定义好各个状态`foundA`、`foundB`，在遍历字符串过程修改状态，在知道下一个状态后继续遍历。

使用状态机处理字符串，定义`match`、`start`、`end`函数，给每一个状态都定义一个函数，编排状态机状态变化逻辑；注意`reConsume`操作。

TODO: 用状态机去表达KMP算法

## 网络基础知识

ISO-OSI七层网络模型

* 物理层、数据链路层对应的就是4GWi-Fi
* 网络层对应Internet；传输层对应TCP
* 会话、表示、应用层对应HTTP


### TCP与IP的基础知识 

require('net')

* 以流来传输数据，流没有分割单位，只保证前后传输顺序。

* 网卡通过端口将接收到的数据分发给计算机的各个应用。

libnet/libpcap

* TCP以数据包为单位传输数据。
* IP地址标记了数据包从哪里发送，应该发往哪



## 解析HTTP请求

HTTP协议：文本型协议，所有内容都是字符串

Request格式：

* POST/HTTP/1.1 Request line
* headers：kv结构
* body：\r\n代表换行

实现Request类 

* Request类在构造函数内对传入参数进行整理，补全两个信息`Content-Type`、`Content-Length` 
* body是KV格式
* 不同的`content-type`影响body的格式
* 在 Requst构造器 中整理必要的信息
*  设计一个send函数，把请求真实发送到服务器
* send函数应该是异步的，所以返回Promise

---

response格式：

* status line
* headers 跟request完全一样
* 空行分割 + body（格式由Content-Type）决定

ChunkBody由16进制数字单独占一行，后跟着内容部分，后面继续跟着数字，直到最后数字为零，最后会到空的chunk，0之后是整个body的结尾。


发送请求：

* 设计支持已有的connection或者资产处新建connection
* 收到数据传给parser
* 根据parser的状态resolve Promise


设计HTTP解析器状态机；

使用常量，用if去做区分的方法实现状态机；从性能角度和从代码的管理角度，都不如用函数的方法。



ResponseParser

* Response必须分段构造，所以我们要用一个ResponseParser来“装配”
* ResponseParser分段处理ResponseText，我们用状态机来分析文本的结构

BodyParser

* Response的body可能根据Content-Type有不同 的结构，因此我们会采用子Parser的结构来解决问题
* 以TrunkedBodyParser为例，我们同样用状态机来处理body的格式



