<template>
<van-nav-bar  left-text="返回"
  left-arrow title="下载帖子资源" 
   @click-left="onClickLeft"
   />
<van-skeleton class="margin-top-1" title :row="3"  v-show="skeletonLoadding" />

<div class="post-box " v-show="!skeletonLoadding">    

     <div v-if="insPostData.length <=0" style="margin:100px auto;">
        <img src="../assets/empty.png" style="width:200px;" alt="">
    </div>

    <div v-else > 
        <div class="tip">
           <p>提示：</p> 
           <p>1. 图片 右击另存为 (pc端); 长按下载 (移动浏览器)</p> 
           <p>2. 视频点击最右边的控件选择下载</p> 
        </div>
        
        <div class="post-box">

             <div class="post-type margin-top" v-for="(item,index) in insPostData" :key="index"  >
                <div v-if="item.media_type === 'image' && item.media_ins_type === 'item'"> 
                        <van-image
                            width="100px"
                            height="100px"
                            fit="fill"
                            position="left"
                            :src="item.media_url"
                        />
                </div> 

                <div v-if="item.media_type==='video'"> 
                    <video width="300" height="150" :src="item.media_url" controls ></video>
                </div> 
            </div>

        </div>
       
    </div>

   


</div>

<!-- <iframe :src="caption" frameborder="0" style="font-size:24px;"></iframe> --> 

<van-button style="margin-left:10px" type="primary" size="small" @click="copyCaptionLink">复制文案链接</van-button>
<!-- 
<div class="footer" v-show="insPostData.length>0">
   <van-button plain hairline type="primary" @click="checkAll">{{checkAllText}}</van-button>
  <van-button  style="width:70%;margin-left:5px;" plain hairline type="primary" @click="download">下载</van-button>
</div>  -->

</template>

<script>
import { ref } from '@vue/reactivity'
import { useRoute, useRouter } from 'vue-router'
import { onMounted, watch } from '@vue/runtime-core'
import { getBatchDownloadDetail } from '../common'
import { Notify } from 'vant'
import { copyContentH5 } from '../utils'


export default { 
    name:"ImageDownload",
    setup() {
        const $route =  useRoute() 
        const $router = useRouter()
        let postParams = ref($route.params)  
        
        let skeletonLoadding = ref(true)
        let onClickLeft = ()=>{
            $router.push({params:{...postParams.value},name:"imageList"}) 
        }
        let checked = ref(true)

        let insPostData = ref([])
        let caption = ref("") 
        let checkAllText = ref("全选")

        watch(insPostData,current=>{   
            for(let {checked,media_ins_type} of current) { 
                if(media_ins_type === "item") {
                    if(checked) return checkAllText.value = "取消"
                }
            } 
            checkAllText.value = "全选"

        },{deep:true})

        

        onMounted(async ()=>{
            if(!postParams.value.mediaKey){return skeletonLoadding.value=false}  
            let res = await getBatchDownloadDetail(postParams.value)  
            skeletonLoadding.value = false
          
            if(res.data.code!==0){
                return Notify({ type:'danger', message:res.data.msg ,duration:2000})
            } 
            let locals = res.data.data.locals  || [] 
            insPostData.value = locals
            insPostData.value.forEach(async i=>{
                i.checked=true 
                if(i.media_ins_type === "caption") {
                    let media_url = i.media_url  
                    caption.value = media_url
                    // let res = await axios.get(media_url)  
                    // caption.value = res.data 
                    //  let res = await fetch(media_url) 
                    //  console.log(res)
                    
                }
            }) //全选
            checkAllText.value = "取消"
        })

        


        return {
            onClickLeft,
            checked,
            skeletonLoadding,
            insPostData,
            caption,
            checkAllText

        }
    },
    data() {
        return {
           
        }
    },
    methods:{
        checkAll() { 
            if(this.checkAllText === "取消") {
                this.insPostData.map(item=>item.checked=false)
            }else if(this.checkAllText === "全选") {
                 this.insPostData.map(item=>item.checked=true )
            }
        },
        download() {
           
        },
        copyCaptionLink() {
          const result = copyContentH5(this.caption) 
          if(result) {
              Notify({type:"success",message:"复制文案链接成功,粘贴到浏览器查看文案！",duration:3000})
          }
        },
    
    }

}
</script>

<style scoped >
.post-box{padding: 10px;display: flex; flex-wrap: wrap;}
.post-img-wrap {padding: 20px;}
.post-type {position: relative;margin-left: 10px;}
.post-type-position{position:absolute;bottom: 38px;left: 38px;z-index: 1000;color: #fff;font-size: 24px;}
.footer{ width: 100%;position: fixed; bottom: 40px;text-align: center;} 
.tip {font-size: 14px;font-family: 'Times New Roman', Times, serif;}

</style>