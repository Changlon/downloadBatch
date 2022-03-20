import {createRouter,createWebHashHistory} from "vue-router"  
import Home from "../components/Home.vue"
import Record from "../components/Record.vue"

const router = createRouter({
    history:createWebHashHistory(), 
    routes:[
        {
            path:"/",
            redirect:"/home"
        },
        {
            path:"/home",
            component:Home
        }, 
        {
            path:"/record",
            component:Record
        }
    ]
})

export default router 
