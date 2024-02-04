import { createApp } from 'vue'
import App from './App.vue'
import { setupRouter } from './router'
// import 'element-plus/dist/index.css'
import './assets/css/style.scss'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// 引入自定义icon
import '@/assets/iconfont/iconfont.css'
import '@/assets/iconfont/iconfont.js'
import { registerGlobComp } from './components'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
await setupRouter(app);

registerGlobComp(app);
app.mount('#app')
