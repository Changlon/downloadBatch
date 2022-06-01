import cryptoJs from "crypto-js" 
var Win = window  




/**
 * 日期转指定的字符格式
 * @param {*} date 
 * @param {*} formate 
 * @returns  
 *  %Y->表示满年占位符 2022  %y表示小年占位符 22 
 *  %M ->表示单数月 1    %MM -> 表示双数月01 
 *  %D ->单数日 %DD-> 双数日 
 */

export  function date2StrFormat_$01(date,format) {     

    if(typeof date === "number" || typeof date === "string") {
        return date2StrFormat_$01(new Date(date),format)
    }
    
    const year =  date.getFullYear() 
    const month = ( date.getMonth() + 1 ) < 10 ?  "0" + ( date.getMonth() + 1 ) :( date.getMonth() + 1 )
    const day   = date.getDate() < 10 ? "0" + date.getDate() : date.getDate()  
    format = format ? format : "%Y-%M-%D"   
    format = format.replace("%MM",month) 
    format = format.replace("%DD",day) 
    format =  format.replace("%Y",year) 
    format = format.replace("%M",date.getMonth()+1)
    format = format.replace("%D",date.getDate()) 
    return format
}

 function s_() {  
     return new Promise(r=>{
         setTimeout(()=>{
            let canvas = Win.document.getElementById('canvas') 
            let message =Win.mask.revealText(canvas)  
            console.log(`message-${new Date().getTime()}`,message)
            r(message)
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
    ) 
    let hmacMd5 =  cryptoJs.HmacMD5( time_base_64 ,cryptoJs.enc.Base64.parse(await s_()))   
    return hmacMd5.toString()
} 


/**
 * md5加密
 */
export function md5(string) {
    return cryptoJs.MD5(string)
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
 export  

 
function parseInsLink(content) {  
    
     
    const ISINSLINK = new RegExp("http(s)?://(www.)?instagram.com/","g")
    const PARSE_URL = /(\w+):\/\/(www\.)?instagram.com(.+)\// 
    const PARSE_PROFILE_URL = /(\w+):\/\/(www\.)?instagram.com(.+)\?/
    if(!ISINSLINK.test(content)) return  
    let urlPatterns = PARSE_URL.exec(content)  
    
    let link, username , type , shortcode , shortcodeLength
    
    if(!urlPatterns) {
        urlPatterns = PARSE_PROFILE_URL.exec(content) 
        link = urlPatterns[0]
        link = link.substring(0,link.length-1) + "/"
        username = urlPatterns[3].substring(1) 
        let linkType = type =  "index" 
        return {
        link:link.indexOf("https://instagram")>=0 ? link.replace("https://instagram","https://www.instagram") : link,
        username,
        type,
        linkType,
        shortcode ,
        shortcodeLength
        }
    }

    link = urlPatterns[0] 
    const pathArr = urlPatterns[3].split("/") 
    pathArr.shift()
  
    if(pathArr.length===1){ 
        type = "index", username = pathArr[0]  
    }else if (pathArr.length ===2){ 
        type = pathArr[0] , shortcode = pathArr[1]
    }else if(pathArr.length ===3) { 
        if(pathArr[0]!=="stories") {
            username = pathArr[0] ,type = pathArr[1] ,shortcode = pathArr[2]
        }else{
            username = pathArr[1],type = pathArr[0],shortcode = pathArr[2]
        }

        shortcodeLength = shortcode ? shortcode.length : 0 
    }

    return {
       link:link.indexOf("https://instagram")>=0 ? link.replace("https://instagram","https://www.instagram") : link,
        username,
        type,
        shortcode ,
        shortcodeLength
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