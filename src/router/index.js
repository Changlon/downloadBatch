import {createRouter,createWebHashHistory} from "vue-router"  
import Home from "../components/Home.vue"
import Record from "../components/Record.vue"
import Sub from "../components/Subscribe.vue"
import ImageList from "../components/ImageList.vue"
import Order from "../components/Order.vue"

const router = createRouter({
    history:createWebHashHistory(), 
    routes:[
        {
            path:"/",
            redirect:"/home"
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
            name:"record",
            meta:{
                keepAlive:true
            }
        },
        {
            path:"/imageList",
            component:ImageList,
            name:"imageList"
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
        }
    ]
})

export default router 
