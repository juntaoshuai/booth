// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store/store'
import resize from './js/resize'
import { MessageBox } from 'mint-ui';
Vue.component(MessageBox.name, MessageBox)

require('./css/reset.css')
//require('./css/swiper.min.css')
require('./css/style.css')

import {scrollLeft} from './js/common'

new Vue({
  el: '#app',
  store,
  render: h => h(App)
})