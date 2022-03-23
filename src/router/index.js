import {createRouter,createWebHashHistory} from "vue-router"  
import Home from "../components/Home.vue"
import Record from "../components/Record.vue"
import Sub from "../components/Subscribe.vue"

const router = createRouter({
    history:createWebHashHistory(), 
    routes:[
        {

            path:"/",
            redirect:"/home",
            
        },
        {
            path:"/home",
            component:Home,
            name:"home"
        }, 
        {
            path:"/record",
            component:Record,
            name:"record"
        },
        {
            path:"/sub",
            component:Sub,
            name:"sub"
        }
    ]
})

export default router 
