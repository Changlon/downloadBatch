<template>

<van-nav-bar  left-text="返回"
  left-arrow title="资源列表" 
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
                              
                                width="100px"
                                height="100px"
                                fit="cover"
                                position="left"
                                :src="item.postDisplay"
                            />
                        </div>

                     </div> 

                    <div class="post-type margin-top"> 
                               <div class="margin-top-3"></div>
                                <van-loading size="34px" v-show="loadding" vertical style="text-align:center;">加载中...</van-loading> 

                                <div v-show="!loadding"> </div>
                    </div>        


             <div v-if="insPostData.length <=0" style="margin:100px auto;">
                        <img src="../assets/empty.png" style="width:200px;" alt="">
                    </div>
            </div>
            
            <div v-show="insPostData.length>0" class="margin-top-3" style="width:97%;margin:30px auto"> 
                
                <van-button type="primary" block @click="downloadBatch" :loading="downLoadding" > 
                     <!-- <van-loading type="spinner" color="#1989fa"  /> -->
                    已选择 {{postCheckedNum}} 批量下载 
                    </van-button>
            </div>
            
             <a  class="down-tip" :href="postDownloadZip" v-show="postDownloadZip" ref="down"> 点击下载压缩文件 </a>

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
import { get } from '../utils'

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
                let res = await downloadZipFile(openid,mediaListStr)   
                downLoadding.value = false
                postDownloadZip.value = res.data 
                Notify({ type: 'success', message: "批量下载成功，复制zip链接在浏览器打开",duration:1000}) 
           }else{
                Notify({ type: 'danger', message: "没有用户openid",duration:1000})
           }

        }
       
        onMounted(async ()=>{

            Notify({ type: 'success', message: "正在获取批量结果",duration:500})
            if(postParams.value.linkType === "p" && postParams.value.username) { 
                postParams.value.link = `https://www.instagram.com/${postParams.value.username}/` 
                postParams.value.linkType = "index" 
            } 
            
            //发送批量任务请求
            let res   
            
            try {
                res = await  batchDownloadMessionInfo(postParams.value)   
                if(res.code!==0){
                    return Notify({ type: 'danger', message: res.msg,duration:2000}) && $router.back()
                }
            }catch(e) {
                 Notify({ type: 'danger', message: e.message,duration:2000})
                 loadding.value = false 
            }
            
            let nextParams = res.data    

            // 请求用户信息
            let insUserDataClear = setTimeout(queryInsUserData,500)

            async function queryInsUserData() {
                if(!nextParams) return clearTimeout(insUserDataClear)
                try {
                   console.log("请求用户数据")
                   res = await getBatchDownloadInsUserResult(nextParams)    
                   if(!res.data) {
                       clearTimeout(insUserDataClear) 
                       return setTimeout(queryInsUserData,500) 
                   }

                   const insUserData_ = res.data  
                   console.log("博主信息",insUserData)
                   skeletonLoadding.value = false  
                   insUserData.value = insUserData_ 
                }catch(e) { 
                    console.log(e) 
                    clearInterval(insUserDataClear)
                    Notify({type:"danger",message:res.data.msg,duration:2000})
                }
                
            }

            //请求帖子数据
            let postDataClear = setTimeout(queryInsData,1000)
            // 终止条件 corsorType = 1  hasNext = false  
            async function queryInsData(corsor = 0 , corsorType = 0 ,hasNext = true ){  
               if(!nextParams) return clearTimeout(postDataClear) 
               try {
                   loadding.value = true
                   console.log("请求用户帖子数据")
                   res = await getBatchDownloadInsDataResult({...nextParams,corsor,corsorType}) 
                   const resData = res.data    
                   corsor = resData.corsor 
                   corsorType = resData.corsorType
                   hasNext = resData.hasNext  
                   if(corsorType === 1 && hasNext === false){ 
                        loadding.value = false
                        return clearTimeout(postDataClear) 
                   }
                   if(hasNext === false && corsorType !==1) corsorType = 1 , corsor = 0
                   const insUserPostData_ = resData.insPostData 
                   if(insUserPostData_) {
                        for(let item of insUserPostData_ ){   
                                try{
                                    item = JSON.parse(item)  
                                    item.checked = true
                                    insPostData.value.push(item)
                                }catch(e) {
                                    Notify({type:"danger",message:e.message,duration:1000})
                                }
                        }
                   }
                  
                   loadding.value = false
                   setTimeout(async ()=>{ await queryInsData(corsor,corsorType,hasNext)},1000)
               }catch(e) { 
                   console.log(e) 
                   clearInterval(postDataClear) 
                   Notify({ type:'danger', message:res.msg ,duration:2000})
                   loadding.value = false 
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
            overlayShow
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
.post-box{padding: 10px;display: flex; flex-wrap: wrap;}
.post-img-wrap {width: 100px;height: 100px;}
.post-type {position: relative;width: 100px;height: 100px;margin-left: 10px;}
.post-type-position{position:absolute;right: 8px;top: 8px;z-index: 1;color: #fff;} 
.post-checkbox-position {position:absolute;right: 8px;bottom: 8px;z-index: 1;color: #fff;}
.ins-user-subscriber-action{position:absolute;top: 5px;right: 1px;}
.down-tip {font-size: 14px;color: brown;}
</style>