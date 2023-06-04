import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'
// import 'element-plus/dist/index.css'
import './assets/css/style.scss'
// 引入自定义icon
import '@/assets/iconfont/iconfont.css'
import '@/assets/iconfont/iconfont.js'
import { registerGlobComp } from './components'

const app = createApp(App)
app.use(router)
registerGlobComp(app);
app.mount('#app')
