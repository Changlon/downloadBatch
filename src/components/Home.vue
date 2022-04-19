<template>
    <div >
        <div class="top-box"> 
           <div class="text-center"><img src="../assets/logo.png" style="width:100px;" alt=""></div>
         
            <div class="van-multi-ellipsis--20 logo-tip">
                一键极速  <i class="ins ins-jisu"></i> <br>
                便捷批量 <i class="ins ins-batch"></i> <br>
                保存Instagrem 博主所有帖子资源   <i class="ins ins-xiazai"></i>
            </div>
        
        </div>  

        <div class="input-box">
        
            <van-search shape="round" v-model="link" placeholder="请粘贴博主页链接" />
            <van-field
                v-model="value"
                is-link
                readonly
                label="时间范围"
                placeholder="选择要保存的时间范围"
                @click="setPicker(true)"
                />
                <van-popup v-model:show="showPicker" round position="bottom">
                    <van-picker
                        :columns="dateFieldRoundStr"
                         @cancel="onCancel"
                         @confirm = "onConfirm"
                       
                    />
                </van-popup>
        </div>

        <div class="margin-top-3" style="width:97%;margin:30px auto"><van-button type="primary" block @click="download" > 
        下载
        </van-button></div> 
        

    </div>  


</template>

<script>
import { ref } from '@vue/reactivity'
import {parseInsLink,getQueryVariable, set, get} from "../utils"
import {Notify} from "vant"

export default {
    name:"Home",
    setup() {
  
        let dateFieldRound = ref([
            0, //一星期
            1 , //一个月
            3 , //三个月
            6 , //半年
            12 , //一年
        ])

        let link = ref("") 
        let  showPicker = ref(false)
        let  dateFieldRoundStr =  dateFieldRound.value.map(days=>days===0 ? `最近1星期` : days === 12 ? `最近1年` : `最近${days}个月`)
        let  value = dateFieldRoundStr[0] 

      
        return {
            dateFieldRound,
            dateFieldRoundStr,
            showPicker,
            value,
            link
        }
    }, 

    created() {
        this.postData.openid = getQueryVariable("openid")  || get("openid")
        if(this.postData.openid) set("openid",this.postData.openid) 
    },
    data() {
        return {
            postData:{
                link:"",
                username:"", 
                linkType:"",
                shortcode:"",
                openid:"",
                days:7,
                scene:"batch" 
            }
            
        }
    },
    methods :{
        setPicker(isShow) {
            this.showPicker = isShow
        },

        onConfirm (value, index)  {
            console.log
            (`当前值: ${value}, 当前索引: ${index}`)
            this.onCancel() 
            this.postData.days = this.dateFieldRound[index] === 0 ?  7 : this.dateFieldRound[index] * 30 
            this.value = this.dateFieldRoundStr[index]
            console.log(this.postData)
            
        },

        onChange (value, index) {
             console.log(`当前值: ${value}, 当前索引: ${index}`);
        },
        
        onCancel () { this.setPicker(false)},  

        //用户下载
        download() {    
            const that = this 
            if(!that.postData.openid) return Notify("没有用户数据")
            if(!that.postData.link) return Notify("请输入链接")
            this.$router.push({params:that.postData,name:"imageList",query:{timestamp:new Date().getTime()}})
        },  
            
    },  
    watch:{
        link(n) {   
            const that  = this 
            const result =  parseInsLink(n) 
            if(!result) return 
            that.postData.link = result.link 
            that.postData.username = result.username 
            that.postData.linkType = result.type 
            that.postData.shortcode = result.shortcode 
        }
    }
    
} 

</script>


<style>

    .top-box {
        background-color:rgba(	245,245,245,.9);
        padding:30px 10px 30px 10px;
    }

    .logo-tip {
        font-size: 14px;  
        color: grey;
        text-align: center;
        font-family: 微软雅黑;
        line-height: 30px;
    }

 

</style>