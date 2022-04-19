import { createApp } from 'vue'
import App from './App.vue'
import "./assets/js/flexible.js" 
import "./assets/js/1.js"   
import router from "./router"   
import Vant from 'vant'
import 'vant/lib/index.css'
import { d_ } from './utils'

// d_() 


createApp(App)  
.use(router)
.use(Vant)
.mount('#app')
