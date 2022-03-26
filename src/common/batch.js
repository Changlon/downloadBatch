/**
 *  @author  Changlon <changlong.a2@gmail.com>
 *  @github  https://github.com/Changlon
 *  @date    2022-03-12 23:47:15 
 *  核心业务逻辑接口 
 */



 import request from "../api" 



 /**
  * 执行批量下载请求
  * @param {*} data 
  * @returns 
  */
 export const batchDownloadMessionInfo =async data => request("/batchDownloadMessionInfo",data,"post") 
 

 /**
  * 获取批量任务结果
  * @param {*} data 
  * @returns 
  */
export const getBatchDownloadResult = async data => request("/getBatchDownloadResult",data,"post")





