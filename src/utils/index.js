

const Win = window 

/**
 * 解析ins链接
 * @param {*} link 
 */
 export  function parseInsLink(content) {  
    const ISINSLINK = new RegExp("http(s)?://(www.)?instagram.com/","g")
    const PARSE_URL = /(\w+):\/\/(www\.)?instagram.com(.+)\//
    if(!ISINSLINK.test(content)) return  
    const urlPatterns = PARSE_URL.exec(content)      
    const link = urlPatterns[0] 
    const pathArr = urlPatterns[3].split("/") 
    pathArr.shift()
    let username , type , shortcode 
    
    if(pathArr.length===1){ 
        type = "profile", username = pathArr[0]  
    }else if (pathArr.length ===2){ 
        type = pathArr[0] , shortcode = pathArr[1]
    }else if(pathArr.length ===3) { 
        username = pathArr[0] ,type = pathArr[1] ,shortcode = pathArr[2]
    }

    return {
        link,
        username,
        type,
        shortcode 
    }
    
}

/**
 * 获取url路径参数
 * @param {*} variable 
 * @returns 
 */
export function getQueryVariable(variable){ 
       let query = Win.location.href.substring(Win.location.href.indexOf("?") + 1)
       let vars = query.split("&");
       for (let i=0;i<vars.length;i++) {
               let pair = vars[i].split("=")
               if(pair[0] == variable){return pair[1]}
       }
       return false
}


