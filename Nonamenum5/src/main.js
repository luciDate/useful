import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Button, Layout, Icon, Drawer, Menu, Form, Input, Checkbox } from 'ant-design-vue'
import './assets/reset.css'
import './assets/iconfont'

Vue.use(Button)
Vue.use(Layout)
Vue.use(Icon)
Vue.use(Drawer)
Vue.use(Menu)
Vue.use(Form)
Vue.use(Input)
Vue.use(Checkbox)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
