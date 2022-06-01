<template>

<van-nav-bar  left-text="返回"
  left-arrow :title="title" 
   @click-left="onClickLeft"
   />
<van-skeleton class="margin-top-1" title :row="3"  v-show="skeletonLoadding" />
    <!-- ins博主账号信息 -->   
    <keep-alive>
            <div class="ins-user-head" v-show="!skeletonLoadding">  
                <div class="ins-user-top"> 
                    <div class="ins-user-avatar"> 
                        <van-image
                            round
                            width="50px"
                            height="50px"
                            fit="cover"
                            position="left"
                            :src="insUserData.insUserPic"
                            />
                    </div> 
                    <div class="ins-user-info"> 
                        
                        <div class="ins-user-name shenglue"> {{insUserData.insUserFullName}} </div> 
                        <div class="ins-user-account-name">{{insUserData.insUserName}} </div>  
                    </div>
                    <div class="ins-user-subscribe "  > {{insUserData.hasSubscribe ? '已订阅':'未订阅'}} </div> 
                    
                    <div class="ins-user-subscriber-action" @click="overlayShow = true"> <i class="ins ins-gengduo"></i> </div> 

                </div>  

                <div class="ins-user-account-data"> 
                    <div class="post-num">{{insUserData.articleQuantity}} 帖子</div> 
                    <div class="fans-num">{{ followNumHandler(insUserData.followedBy)}}粉丝</div> 
                    <div class="follow">{{ followNumHandler(insUserData.followed) }} 关注</div>
                </div>        
                <div class="ins-user-desc">{{insUserData.biography}}</div> 
            </div>

    </keep-alive>
  <!-- 帖子，视频 , 标记 --> 
    <van-tabs
        v-model:active="activeName"
        color="#DCDCDC"
        line-height="2px"
        @change="changeTab"
     >
        <van-tab name="p">  <template v-slot:title><van-icon name="qr" /> 帖子</template>  

            <van-skeleton class="margin-top-1" title :row="3"  v-show="skeletonLoadding" />

            <div class="post-box" v-show="!skeletonLoadding" >
                    
                    <div class="post-type margin-top" v-for="(item,index) in insPostData" :key="index" >
                        <!-- isVideo 0 未知 1 单图  2 单视频 8 视频图片混合 -->
                        <i class="post-type-position ins " :class=" item.isVideo === 2 ? 'ins-shexiangtou'  : item.isVideo ===8 ? 'ins-duotu' : ''"></i> 
                        <van-checkbox class="post-checkbox-position" shape="square" v-model="item.checked"></van-checkbox>
                        <div class="post-img-wrap"   @click="queryDetial(item.mediaKey)">
                            <van-image
                                width="100%"
                                height="100px"
                                fit="cover"
                                position="left"
                                :src="item.postDisplay"
                            />
                        </div>

                     </div> 

                    <div class="post-type margin-top" v-show="loadding"> 
                               <div class="margin-top-3"></div>
                               <van-loading size="34px" v-show="loadding" vertical style="text-align:center;">加载中...</van-loading> 
                    </div>        

                   
            </div>
            
            <div v-show="insPostData.length>0" class="margin-top-3" style="width:97%;margin:30px auto"> 
                
                <van-button type="primary" block @click="downloadBatch" :loading="downLoadding" > 
                     <!-- <van-loading type="spinner" color="#1989fa"  /> -->
                    已选择 {{postCheckedNum}} 批量下载 
                    </van-button>
            </div>
            
            <div class="tip padding"> 
                <p>
                 <a  class="down-tip" :href="postDownloadZip" v-show="postDownloadZip" ref="down"> 点击下载压缩文件 </a>
                </p>
                <p>
                 <van-button style="margin-left:10px" type="primary" size="small" v-show="postDownloadZip" @click="copyDownLoadLink">复制文件下载地址</van-button>
                </p>

                <p>批量保存方法: </p> 
                <p>1. 选择文件点击【批量下载】后, 点击【复制文件下载地址】按钮，粘贴到手机自带的浏览器访问即可！</p>
                <p>2. 如果你的浏览器支持自动下载，直接点击【点击下载压缩文件】下载即可！</p>
                <p>3. 如果你感觉下载时间漫长，可以先退出，下载好后公众号会发送提醒！</p> 
              
             </div>


        </van-tab> 

      
        

        <van-tab name="tv"> <template v-slot:title><van-icon name="video-o" /> IGTV</template> 
              <div style="padding:80px">
                        <img src="../assets/working.png" style="width:200px;" alt="">
                </div>
        </van-tab>


        <van-tab name="tag"><template v-slot:title><van-icon name="bookmark-o" /> 已标记</template> 
               <div style="padding:80px">
                        <img src="../assets/working.png" style="width:200px;" alt="">
                </div>
        </van-tab>

    </van-tabs>



    <van-overlay :show="overlayShow" @click="overlayShow = false" >
        <div style="position:fixed;width:100%;bottom:10px;"> 
            <van-button color="#fff" type="primary" block @click.stop="subscribe(insUserData.insUserId)"> <span style="color:#000;"> {{insUserData.hasSubscribe ? '取消订阅 TA':'订阅 TA'}} </span>  </van-button> 
            <div style="margin-top:10px;"></div>
            <van-button color="#fff" type="primary" block><span style="color:#000;">取消</span></van-button>
        </div> 
        
    </van-overlay>

</template>

<script> 
import { ref } from '@vue/reactivity' 
import {batchDownloadMessionInfo,getBatchDownloadInsUserResult,getBatchDownloadInsDataResult,downloadZipFile} from "../common"
import {Notify} from "vant"
import { getCurrentInstance, onMounted, watch } from '@vue/runtime-core'
import { useRoute, useRouter } from 'vue-router'
import { copyContentH5, get } from '../utils'

export default { 
    name:"ImageList", 
    setup() { 
        
        const {proxy} =  getCurrentInstance() 
        const $route = useRoute() 
        const $router = useRouter() 

        let postParams = ref($route.params)
        let loadding = ref(true) 
        let downLoadding = ref(false)
        let skeletonLoadding = ref(true)
        let insUserData = ref({}) 
        let insPostData = ref([]) 
        let postCheckedNum = ref(0) 
        let postDownloadZip = ref("") 

        
        let activeName = ref("p")
        let overlayShow = ref(false)
        let title = ref("资源下载中 • 请耐心等待")

        watch(insPostData,(current)=>{ 
            let checkedNum = 0 
            current.forEach(({checked})=>{
                if(checked) checkedNum++
            })
            postCheckedNum.value = checkedNum
        },{deep:true})


        let onClickLeft = ()=>{$router.push({name:"home"})} 

        let followNumHandler = num =>{
            if( (num / 10000 ) >= 1) return `${num/10000} 万`
            else return num
        }

        let queryDetial = media_key =>{    
            $router.push({params:{...postParams.value,mediaKey:media_key,name:"imageList"},name:"ImageDownload",query:{timestamp : new Date().getTime()}})
        } 


        let subscribe = insUserId =>{ 
            alert(insUserId)
        }

        let downloadBatch = async ()=>{
            const openid = postParams.value.openid || get("openid")
            const mediaList = [] 
            for(let {mediaKey,checked} of insPostData.value) { 
                checked? mediaList.push(mediaKey): 0
            }

            if(mediaList.length<=0) return Notify({type:"danger",message:"请选择批量下载的帖子"})

           if(openid && mediaList.length > 0 ) {  
                let mediaListStr = ""  
                for(let str of mediaList) {
                    mediaListStr = mediaListStr + `&mediaList=${str}`
                }
                downLoadding.value = true
                
                let res 
                
                try{
                    res = await downloadZipFile(openid,mediaListStr) 
                    if(res.code!==0) {
                                downLoadding.value = false
                                return  Notify({type:"danger",message:res.msg})
                           }

                }catch(e){
                     downLoadding.value = false
                  return  Notify({type:"danger",message:e.message})
                }
                
                downLoadding.value = false
                postDownloadZip.value = res.data 
                Notify({ type: 'success', message: "批量下载成功，复制zip链接在浏览器打开",duration:1000}) 
           }else{
                Notify({ type: 'danger', message: "没有用户openid",duration:1000})
           }

        }
       
        let copyDownLoadLink = ()=>{
            const result = copyContentH5(postDownloadZip.value) 
            if(result) {
                Notify({type:"success",message:"复制文案链接成功,粘贴到浏览器查看文案！",duration:3000})
            }
       }


        onMounted(async ()=>{

            Notify({ type: 'success', message: "正在获取批量结果",duration:500})
            /** 如果帖子链接中带username */
            if(postParams.value.linkType === "p" && postParams.value.username) { 
                postParams.value.link = `https://www.instagram.com/${postParams.value.username}/` 
                postParams.value.linkType = "index" 
            } else if(postParams.value.linkType === "index" && postParams.value.username) { 
                postParams.value.link = `https://www.instagram.com/${postParams.value.username}/` 
            }
            
            //发送批量任务请求
            let res   
            
            try {
                res = await  batchDownloadMessionInfo(postParams.value)   
                if(res.code!==0){
                   Notify({ type: 'danger', message: res.msg,duration:2000})  
                   setTimeout(()=>{$router.back()},2000)  
                  return   
                }
            }catch(e) {
                 Notify({ type: 'danger', message: e.message,duration:2000})
                 loadding.value = false 
            }
            
            let nextParams = res.data    

            // 请求用户信息
           await queryInsUserData()

            async function queryInsUserData() {
                if(!nextParams) return 
                try {
                   console.log("请求用户数据")
                   res = await getBatchDownloadInsUserResult(nextParams)    
                   if(res.code!==0) {return Notify({ type:'danger', message:res.msg ,duration:2000})}
                 
                   const insUserData_ = res.data  
                   /** 解码url */
                   insUserData_.insUserPic = decodeURIComponent(insUserData_.insUserPic) 
                   skeletonLoadding.value = false  
                   insUserData.value = insUserData_ 
                }catch(e) { 
                    console.log(e) 
                    Notify({type:"danger",message:res.data.msg,duration:2000})
                }
                
            }

            //请求帖子数据
            setTimeout(()=>{queryInsData(0,0,true)},1500)
            // 终止条件 corsorType = 1  hasNext = false  
            async function queryInsData(corsor = 0 , corsorType = 0 ,hasNext = true ){  
               if(!nextParams) return 
               try {
                   loadding.value = true
                   console.log("请求用户帖子数据")
                   res = await getBatchDownloadInsDataResult({...nextParams,corsor,corsorType}) 
                   console.log("帖子数据返回",res)
                   const resData = res.data    
                   if(!resData) {
                       loadding = false 
                       return Notify({ type:'danger', message:"网络异常！" ,duration:2000})
                    //    setTimeout( ()=>{ queryInsData(corsor,corsorType,hasNext)},500)
                   }

                   corsor = resData.corsor // 0 , 3 , 3
                   corsorType = resData.corsorType // 0 , 1 , 1 
                   hasNext = resData.hasNext  // fasle , true , true 

                   if(corsorType === 1 && hasNext === false){ 
                       console.log(`触发了终止条件 corsor=${corsor} corsorType = ${corsorType} hasNext =${hasNext}`)
                        loadding.value = false
                        title.value = "资源获取完毕"
                        return 
                   }

                   if(hasNext === false && corsorType !==1) corsorType = 1 , corsor = 0 ,hasNext = true 
                   
                   /** 处理得到的帖子数据 */
                   const insUserPostData_ = resData.insPostData 
                   if(insUserPostData_) {
                        for(let item of insUserPostData_ ){   
                                try{
                                    item = JSON.parse(item)  
                                    item.checked = true
                                    item.postDisplay = decodeURIComponent(item.postDisplay) 
                                    insPostData.value.push(item)
                                }catch(e) {
                                    Notify({type:"danger",message:e.message,duration:500})
                                }
                        }
                   }
                  /************************/ 
                  queryInsData(corsor,corsorType,hasNext) 
                  

               }catch(e) { 
                   console.log(e) 
                   Notify({ type:'danger', message:"网络异常！" ,duration:2000})
                   loadding.value = false 
                   return
               }
            }
            
        })

       
        return {
            loadding,
            downLoadding,
            skeletonLoadding,
            insUserData,
            insPostData,
            postCheckedNum,
            postDownloadZip,
            activeName,
            onClickLeft,
            followNumHandler,
            queryDetial,
            subscribe,
            downloadBatch,
            overlayShow,
            title,
            copyDownLoadLink
        }

    },
    data() {
       return {
           a:new Date().getTime()
       }
    },
    mounted() {
        console.log("mounted")
    },
    methods:{
        changeTab(name) { 
           
        }
    }
}
</script>

<style scoped>
.ins-user-head{font-size: 16px;font-weight: lighter;padding: 10px 20px;}
.ins-user-top {display: flex;position: relative;}
.ins-user-info {padding: 2px 10px;}
.ins-user-name {font-weight: bolder;}
.ins-user-account-name{font-weight: lighter;color: rgba(100, 100, 100, .5);font-size: 14px;}
.ins-user-subscribe{font-size: 14px;padding: 2px;color: rgba(100, 100, 100, .8);}
.ins-user-account-data{display: flex;justify-content: space-around;padding: 10px 1px;}
.ins-user-desc{padding: 5px 10px;font-size: 14px;font-family: 黑体;}
.post-box{padding: 20px;display: flex; flex-wrap: wrap;text-align: center;}
.post-img-wrap {width:100%;}
.post-type {position: relative;width: 30%;height: 100px;margin-left: 10px;}
.post-type-position{position:absolute;right: 20%;top: 8px;z-index: 1;color: #fff;} 
.post-checkbox-position {position:absolute;right: 8px;bottom: 8px;z-index: 1;color: #fff;width: 100%;}
.ins-user-subscriber-action{position:absolute;top: 5px;right: 1px;}
.down-tip {font-size: 14px;color: brown;}
.tip {font-size: 14px;font-family: 'Times New Roman', Times, serif;}
</style>