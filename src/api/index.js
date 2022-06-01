import conf from "./api.config" 
import { getSign } from "../utils"
import generateReqAny from "request-any" 

const env = process.env.NODE_ENV 
const {dev,pro} = conf 
const {domain,port} = env.startsWith("dev") ?  dev : pro  
const baseURL = `${domain.startsWith("http")? domain : "http://" + domain}${port?":"+port:""}/api/wechat/common`  

export const cache = conf.cache 
export const expire = conf.expire 
export default  generateReqAny({
    reqUrl: env.startsWith("dev") ? "/target":baseURL,
     beforeRequest: async(data,headers)=>{
        headers["Sign"] = await getSign()
    },
    timeout:conf.timeout
})








