

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