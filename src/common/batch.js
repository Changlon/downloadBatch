/**
 *  @author  Changlon <changlong.a2@gmail.com>
 *  @github  https://github.com/Changlon
 *  @date    2022-03-12 23:47:15 
 *  核心业务逻辑接口 
 */



 import request from "../api" 
 import {cache,expire} from "../api" 

 /**
  * 执行批量下载请求
  * @param {*} data 
  * @returns 
  */
//  export const batchDownloadMessionInfo =async data => request("/batchDownloadMessionInfo",data,"post") 
 export const batchDownloadMessionInfo =async data => request({route:"/batchDownloadMessionInfo",data,type:"post"})  
 
 /**
  * 获取批量任务ins帖子信息
  * @param {*} data 
  * @returns 
  */
// export const getBatchDownloadInsDataResult = async data=>request("/queryBatchDownloadResult",data,"post") 
export const getBatchDownloadInsDataResult = async data=>request({route:"/queryBatchDownloadResult",data,type:"post",expire,cache}) 


 /**
  * 获取批量任务ins博主信息
  * @param {*} data 
  * @returns 
  */
// export const getBatchDownloadInsUserResult = async data => request("/queryInsUserInfo",data,"post")
export const getBatchDownloadInsUserResult = async data => request({route:"/queryInsUserInfo",data,type:"post",expire,cache})  


/**
 * 获取批量任务细节
 * @param {*} data 
 * @returns 
 */
// export const getBatchDownloadDetail =async data=>request("/queryPostDetail",data,"post")
export const getBatchDownloadDetail =async data=>request({route:"/queryPostDetail",data,type:"post",expire,cache}) 

/**
 * 批量下载帖子
 * @param {*} data 
 * @returns 
 */
// export const downloadZipFile = async (openid,mediaListStr)=>request(`/downloadZipFile?openid=${openid}&${mediaListStr}`,{},"post") 
export const downloadZipFile = async (openid,mediaListStr)=>request({route:`/downloadZipFile?openid=${openid}&${mediaListStr}`,type:"post"})  


/**
 * 查询批量任务历史记录
 * @param {*} openid 
 * @returns 
 */
// export const queryBatchHistory = async openId=> request("/queryBatchHistory",{openId},"post")
export const queryBatchHistory = async openId=> request({route:"/queryBatchHistory",data:{openId},type:"post",cache,expire}) 



/**
 * 查询批量任务历史记录结果
 * @param {*} historyId 
 * @param {*} corsor 
 * @param {*} corsorType 
 * @returns 
 */
// export const queryBatchHistoryResult = async (historyId,corsor = 0 ,corsorType = 0 )=> request("/queryBatchHistoryResult",{historyId,corsor,corsorType},"post") 
export const queryBatchHistoryResult = async (historyId,corsor = 0 ,corsorType = 0 )=> request({route:"/queryBatchHistoryResult",data:{historyId,corsor,corsorType},type:"post",cache,expire})  



/**
 * 获取博主信息
 * @param {*} openid 
 * @param {*} username 
 * @returns 
 */
// export const queryInsUserInfo = async (openid,username) => request("/queryInsUserInfo",{openid,username},"post")
export const queryInsUserInfo = async (openid,username) => request({route:"/queryInsUserInfo",data:{openid,username},type:"post",cache,expire}) 




