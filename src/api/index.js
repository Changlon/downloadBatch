import conf from "./api.config" 
// import axios from "axios" 
// import qs from "qs"
import { getSign } from "../utils"
import generateReqAny from "request-any" 

const env = process.env.NODE_ENV 
const {dev,pro} = conf 
const {domain,port} = env.startsWith("dev") ?  dev : pro  
const baseURL = `${domain.startsWith("http")? domain : "http://" + domain}${port?":"+port:""}/api/wechat/common`  

export const cache = conf.cache 
export const expire = conf.expire 
export default  generateReqAny({
     reqUrl:baseURL,
     beforeRequest: async(data,headers)=>{
        headers["Sign"] = await getSign()
    },
    timeout:conf.timeout
})

// export const request = axios.create({ 
//     //TODO : 如果没有设置反向代理这个要填对应的后台地址
//     baseURL,
//     timeout:conf.timeout
// })

// export default  async (route ,data = {},type = "get", json =false ) => { 
//     // if(!request.baseURL) route = "/api" + `${route}`
//     type = type.toLowerCase()    
//     if(type === "get" || type === "delete" || type === "del") {
//         type = type === "del" ?  "delete" :type 
//         return await request[type](route,{
//             headers:{
//                 "Content-Type": json? "application/json" :"application/x-www-form-urlencoded",
//                 "Sign": await getSign()
//             },
//             data: json ? JSON.stringify(data) : qs.stringify(data)
//         })

//     }else if(type === "put" || type === "post") {
//         return await request[type](route,json ? JSON.stringify(data) : qs.stringify(data),{
//             headers:{
//                 "Content-Type": json? "application/json" :"application/x-www-form-urlencoded",
//                 "Sign":await getSign()
//             } 
//         })
//     }else{ 
//         throw new Error("不支持其他请求!")
//     }
    
// }   








