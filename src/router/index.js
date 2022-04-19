import {createRouter,createWebHashHistory} from "vue-router"  
import Home from "../components/Home.vue"
import Record from "../components/Record.vue"
import Sub from "../components/Subscribe.vue"
import ImageList from "../components/ImageList.vue"
import Order from "../components/Order.vue"
import ImageDownload from "../components/ImageDownload.vue" 
import HistoryList from "../components/HistoryList.vue" 

const router = createRouter({
    history:createWebHashHistory(), 
    routes:[
        {
            path:"/",
            redirect:"/home",
            meta:{
                keepAlive:true
            }
        },
        {
            path:"/home",
            component:Home,
            name:"home",
            meta:{
                keepAlive:true
            }
        }, 
        {
            path:"/record",
            component:Record,
            name:"record"
        },
        {
            path:"/imageList",
            component:ImageList,
            name:"imageList",
            meta:{
                keepAlive:false
            }
        },

        {
            path:"/historyList",
            component:HistoryList,
            name:"historyList",
            meta:{
                keepAlive:false
            }
        },

        {
            path:"/imageDownload",
            component:ImageDownload,
            name:"ImageDownload",
         
        },

        {
            path:"/sub",
            component:Sub,
            name:"sub"
        },

        {
            path:"/order",
            component:Order,
            name:"order"
        },
      
    ]
})

export default router 
