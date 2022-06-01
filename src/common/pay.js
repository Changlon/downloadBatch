/**
 *  @author  Changlon <changlong.a2@gmail.com>
 *  @github  https://github.com/Changlon
 *  @date    2022-05-03 00:45:30 
 *  支付接口
 */



 import request from "../api"  
 import { cache,expire } from "../api"


 /**
  * 获取商品item 
  * @returns 
  */
 export const getOrderItem  = async ()=> request({route:"/orderItem",cache,expire})   



 /**
  * 创建订单
  * @param {*} openid 
  * @param {*} itemId 
  * @returns 
  */
 export const createOrder = async (openid,itemId)=> request({route:"/createOrder",type:"post",data:{openid,itemId}})



/**
 * 获取用户信息
 * @param {*} openid 
 * @returns 
 */
 export const getUserInfo = async (openid) => request({route:`/user?openid=${openid}`,data:{}})

