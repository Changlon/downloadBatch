import { createApp } from 'vue'
import App from './App.vue'

import router from "./router" 
import {
     Button ,Tabbar, TabbarItem, Col, Row,Icon , Search,
     Popup,Field,Picker,Loading,NavBar,Skeleton , Image as VanImage,
     Tab, Tabs
} from 'vant'  

createApp(App)  
.use(router)
.use(Button).use(Tabbar).use(TabbarItem) .use(Col)
.use(Row).use(Icon) .use(Search) .use(Popup)
.use(Field).use(Picker).use(Loading).use(NavBar)
.use(Skeleton).use(VanImage).use(Tab).use(Tabs)
.mount('#app')
