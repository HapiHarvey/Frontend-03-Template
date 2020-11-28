import {createElement, Text, Wrapper} from './createElement'

import {Carousel} from './Carousel.js'
import {Panel} from './Panel.js'
import {TabPanel} from './TabPanel.js'
import {ListView} from './ListView.js'

let componnent = <Carousel data={[
  'https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg',
  'https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg',
  'https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg',
  'https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg'
]} />

componnent.mountTo(document.body)