import cryptoJs from "crypto-js" 
var Win = window  



 function s_() {  
     return new Promise(r=>{
         setTimeout(()=>{
            let canvas = Win.document.getElementById('canvas') 
            let message =Win.mask.revealText(canvas)  
            console.log(message)
            if(message){
                r(message)   
            }
         })
     })
}


/**
 * 防止被人恶意调式
 */
export function d_() {
    function block() {
        if (
            Win.outerHeight - window.innerHeight > 200 ||
            Win.outerWidth - window.innerWidth > 200
        ) {
            Win.document.body.innerHTML =
                "检测到非法调试,请关闭后刷新重试!";
                alert("不学好")
        }
        setInterval(() => {
            (function () {
                return false;
            }
                ["constructor"]("debugger")
                ["call"]());
        }, 50) 
    }
    try {
        block() 
    } catch (err) {}
}

/**
 * 获取sign
 * @returns 
 */

export async function getSign(){
    let timestamp =  new Date().getTime()
    timestamp = (timestamp + "").substring(0,9) 
    let time_base_64 =  cryptoJs.enc.Base64.stringify(
        cryptoJs.enc.Utf8.parse(timestamp)
    ) + "\n"
    let hmacMd5 =  cryptoJs.HmacMD5( time_base_64 ,cryptoJs.enc.Base64.parse(await s_()))   
    return hmacMd5.toString()
} 


/**
 * 浏览器本地清空缓存
 */
 export function clear() { 
    if(Win.localStorage) {
        Win.localStorage.clear()
    }else{
        console.error("浏览器不支持localstorage")
    }
}


/**
 * 浏览器本地移除缓存
 * @param {*} key 
 */
 export function remove(key) { 
    if(Win.localStorage) {
        Win.localStorage.removeItem(key)
    }else{
        console.error("浏览器不支持localstorage")
    }
}


/**
 * 浏览器本地 get 缓存
 * @param {*} key 
 */
 export function get(key) { 
    if(Win.localStorage) {
      return Win.localStorage.getItem(key)
    }else{
        console.error("浏览器不支持localstorage")
    }
}


/**
 * 浏览器本地set 缓存
 * @param {*} key 
 * @param {*} value 
 */
export function set(key,value) { 
    if(Win.localStorage) {
        Win.localStorage.setItem(key,value)
    }else{
        console.error("浏览器不支持localstorage")
    }
}



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
        type = "index", username = pathArr[0]  
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




    //h5复制文本到剪切板
 export  function copyContentH5(content) {
        var copyDom = document.createElement('div');
        copyDom.innerText=content;
        copyDom.style.position='absolute';
        copyDom.style.top='0px';
        copyDom.style.right='-9999px';
        document.body.appendChild(copyDom);
        //创建选中范围
        var range = document.createRange();
        range.selectNode(copyDom);
        //移除剪切板中内容
        Win.getSelection().removeAllRanges();
        //添加新的内容到剪切板
        Win.getSelection().addRange(range);
        //复制
        var successful = document.execCommand('copy');
        copyDom.parentNode.removeChild(copyDom);
        try{
            var msg = successful ? "successful" : "failed";
            console.log('Copy command was : ' + msg);
            return true
        } catch(err){
            console.log('Oops , unable to copy!'); 
            return false
        }
    }