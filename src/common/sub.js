
/**
 *  @author  Changlon <changlong.a2@gmail.com>
 *  @github  https://github.com/Changlon
 *  @date    2022-04-07 15:11:51
 */

import request from "../api"  





/**
 * 获取全部博主分类
 * @returns 
 */
export const getAllCategorites = async () => {
    return {
        data:[
            { id:1, text: '订阅' },
            { id:2,text: '热门' },
            { id:3,text: '全部' },
            { id:4,text: '内地' },
            { id:5,text: '港台' },
            { id:6,text: '泰国' },
            { id:7,text: '日韩' },
            {id:8,text: '欧美' },
            {id:9,text: '星粉' },
            {id:10,text: '萌娃' },
            {id:11,text: '品牌' },
            {id:12,text: '穿搭' },
            {id:13,text: '美甲' },
            {id:14,text: '美妆' },
            {id:15,text: '美发' },
            {id:16,text: '纹身' },
            {id:17,text: '美女' },
            {id:18,text: '体育' },
            {id:19, text: '美食' },
            {id:20, text: '摄影' },
            {id:21, text: '花艺' },
            {id:22, text: '艺术' },
            {id:23, text: '旅行' } 
        ]
    }
}


/**
 * 根据分类获取博主列表
 * @param {*} param0 
 * @returns 
 */
export const searchInsUserByCategory = async ({ cateId = 1 ,  start = 1 ,count = 20 }) =>{ 

    return new Promise(r=>{
        setTimeout(()=>{r(
            {
                data: [
                    {
                        id:1,
                        account:"杜兰特",
                        username:"esakdjashidhaisd",
                        profile_url:"https://cdn.jsdelivr.net/npm/@vant/assets/cat.jpeg",
                        is_sub:true
                    },
                    {
                        id:1,
                        account:"詹姆斯",
                        username:"king_james",
                        profile_url:"https://cdn.jsdelivr.net/npm/@vant/assets/cat.jpeg",
                        is_sub:true
                    }
                ],
                total: 2,
            }
        )},1000)
    }) 
}


 /**
  * 分页搜索博主接口
  * @param {*} data 
  * @returns 
  */
  export const searchInsUser = async ( {name,start = 1, count=20 }) => {  
        return {
            data: [
                {
                    id:1,
                    account:"account",
                    username:"xxxx",
                    profile_url:"https://cdn.jsdelivr.net/npm/@vant/assets/cat.jpeg",
                    is_sub:false
                },
                {
                    id:1,
                    account:"account",
                    username:"xxxx",
                    profile_url:"https://cdn.jsdelivr.net/npm/@vant/assets/cat.jpeg",
                    is_sub:true
                }
            ],
            total: 100,
        }
  }
 
// request("/searchInsUser",{name},"post") 