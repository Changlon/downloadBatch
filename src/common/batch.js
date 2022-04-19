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
  * 获取批量任务ins帖子信息
  * @param {*} data 
  * @returns 
  */
export const getBatchDownloadInsDataResult = async data=>request("/queryBatchDownloadResult",data,"post")

 /**
  * 获取批量任务ins博主信息
  * @param {*} data 
  * @returns 
  */
export const getBatchDownloadInsUserResult = async data => request("/queryInsUserInfo",data,"post")


/**
 * 获取批量任务细节
 * @param {*} data 
 * @returns 
 */
export const getBatchDownloadDetail =async data=>request("/queryPostDetail",data,"post")



/**
 * 批量下载帖子
 * @param {*} data 
 * @returns 
 */
export const downloadZipFile = async (openid,mediaListStr)=>request(`/downloadZipFile?openid=${openid}&${mediaListStr}`,{},"post") 


/**
 * 查询批量任务历史记录
 * @param {*} openid 
 * @returns 
 */
export const queryBatchHistory = async openId=> request("/queryBatchHistory",{openId},"post")



/**
 * 查询批量任务历史记录结果
 * @param {*} historyId 
 * @param {*} corsor 
 * @param {*} corsorType 
 * @returns 
 */
export const queryBatchHistoryResult = async (historyId,corsor = 0 ,corsorType = 0 )=> request("/queryBatchHistoryResult",{historyId,corsor,corsorType},"post") 



/**
 * 获取博主信息
 * @param {*} openid 
 * @param {*} username 
 * @returns 
 */
export const queryInsUserInfo = async (openid,username) => request("/queryInsUserInfo",{openid,username},"post")





