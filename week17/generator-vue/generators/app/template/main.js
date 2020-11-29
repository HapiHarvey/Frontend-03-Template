import HelloWord from './HelloWorld.vue'
import Vue from "Vue"

new VTTCue({
  el: '#app',
  render: h => h(HelloWord)
})