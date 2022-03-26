<template>
<van-nav-bar  left-text="返回"
  left-arrow title="资源列表" 
   @click-left="onClickLeft"
   />

<div>

</div>
<van-skeleton class="margin-top-1" title :row="3"  v-show="!acceptData" />

<div v-show="acceptData"> 

    <!-- ins博主账号信息 -->   

    <div class="ins-user-head">  
        <div class="ins-user-top"> 
            <div class="ins-user-avatar"> 
                <van-image
                    round
                    width="50px"
                    height="50px"
                    fit="cover"
                    position="left"
                    src="https://cdn.jsdelivr.net/npm/@vant/assets/cat.jpeg"
                    />
            </div> 
            <div class="ins-user-info"> 
                 
                <div class="ins-user-name">李现  </div> 
                <div class="ins-user-account-name">@mr.lixian</div>  
            </div>
            <div class="ins-user-subscribe">已订阅</div> 
            <div class="ins-user-subscriber-action"> <i class="ins ins-gengduo"></i> </div> 

        </div>  

        <div class="ins-user-account-data"> 
            <div class="post-num">{{677}} 帖子</div> 
            <div class="fans-num">{{200.7}}万 粉丝</div> 
            <div class="follow-">{{76}} 关注</div>
        </div>        

        <div class="ins-user-desc">{{"要让这个世界有了我，可以有那么一点不一样谢谢谢谢谢寻谢谢谢谢谢寻寻寻寻寻寻寻寻寻寻寻寻寻寻寻寻寻寻"}}</div> 
        
    </div>

    <!-- 帖子，视频 , 标记 --> 
    <van-tabs
        v-model:active="activeName"
        color="#DCDCDC"
        line-height="2px"
        @change="changeTab"
     >
        <van-tab name="p">  <template v-slot:title><van-icon name="qr" /> 帖子</template> 
            <div class="post-box">
                <div class="post-type margin-top" >
                    <i class="post-type-position ins " :class=" false ? 'ins-duotu' : 'ins-shexiangtou'"></i>
                    <div class="post-img-wrap">
                        <van-image
                            width="100px"
                            height="100px"
                            fit="cover"
                            position="left"
                            src="https://cdn.jsdelivr.net/npm/@vant/assets/cat.jpeg"
                        />
                    </div>
                 </div>
            </div>
        </van-tab>

        

        <van-tab name="tv"> <template v-slot:title><van-icon name="video-o" /> IGTV</template> 
            功能开发中
        </van-tab>


        <van-tab name="tag"><template v-slot:title><van-icon name="bookmark-o" /> 已标记</template> 
            功能开发中
        </van-tab>

    </van-tabs>

     <div class="margin-top-1"></div>
     <van-loading size="34px" v-show="loadding" vertical style="text-align:center;">加载中...</van-loading>


</div>




</template>

<script> 
import { ref } from '@vue/reactivity' 
import {batchDownloadMessionInfo} from "../common"
import {Notify} from "vant"

export default { 
    name:"ImageList", 
    setup() {
        let loadding = ref(true) 
        let acceptData = ref(true) //收到轮询数据之前为false
        let activeName = ref("p")
        let onClickLeft = ()=>{history.back()}
        return {
            loadding,
            acceptData,
            activeName,
            onClickLeft
        }
    },
    created(){
        const postParams = this.$route.params 
        const {linkType,username} = postParams 
        if(linkType === "p" && username) {
            postParams.link = `https://www.instagram.com/${username}/` 
            postParams.linkType = "profile"
        }
        
        // (async()=>{
        //     //发送批量任务请求
        //    const res = await batchDownloadMessionInfo(postParams) 
        //    if(res.data.code === 500) return Notify(res.data.msg) && this.$router.back() 
        //     Notify({ type: 'success', message: res.data.msg })
        //     this.loadding = true
            
        //     //轮询获取数据 


        // })()


        
      

        
    },
    methods:{
        changeTab(name) { 
            if(name!=="p") return this.loadding = false 
            else this.loadding = true 
        }
    }

}
</script>

<style>
.ins-user-head{font-size: 16px;font-weight: lighter;padding: 10px 20px;}
.ins-user-top {display: flex;position: relative;}
.ins-user-info {padding: 2px 10px;}
.ins-user-name {font-weight: bolder;}
.ins-user-account-name{font-weight: lighter;color: rgba(100, 100, 100, .5);font-size: 14px;}
.ins-user-subscribe{font-size: 14px;padding: 2px;color: rgba(100, 100, 100, .8);}
.ins-user-account-data{display: flex;justify-content: space-around;padding: 10px 1px;}
.ins-user-desc{padding: 5px 10px;font-size: 14px;font-family: 黑体;}
.post-box{padding: 10px;display: flex; justify-content: space-between;flex-wrap: wrap;}
.post-img-wrap {width: 100px;height: 100px;}
.post-type {position: relative;width: 100px;height: 100px;}
.post-type-position{position:absolute;right: 8px;top: 8px;z-index: 1;color: #fff;}

.ins-user-subscriber-action{position:absolute;top: 5px;right: 1px;}


</style>