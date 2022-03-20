<template>
    <div >
        <div class="top-box"> 
           <div class="text-center"><img src="../assets/logo.png" style="width:150px;height:120px" alt=""></div>
         
            <div class="van-multi-ellipsis--20 logo-tip">
                一键极速  <van-icon name="chart-trending-o" color="#C0C0C0" /> <br>
                便捷批量 <van-icon name="exchange" color="#C0C0C0" /> <br>
                保存  <van-icon name="down" color="#C0C0C0" />   Instagrem 博主所有资源
            </div>
        
        </div>  

        <div class="input-box">
        
            <van-search v-model="link" placeholder="请粘贴博主主页或帖子链接" />
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

    <div class="margin-top-3" style="width:97%;margin:30px auto"><van-button type="primary" block >下载</van-button></div> 
        

        
    </div> 



 

</template>

<script>
import { ref } from '@vue/reactivity'

export default {
    name:"Home",
    setup() {
  
        let dateFieldRound = ref([
            0, //一星期
            1, //一个月
            3, //三个月
            6, //半年
            12, //一年
        ])

        let  showPicker = ref(false)
        let  dateFieldRoundStr =  dateFieldRound.value.map(days=>days===0 ? `最近1星期` : days === 12 ? `最近1年` : `最近${days}个月`)
        let  value = dateFieldRoundStr[0] 

       

        return {
            dateFieldRound,
            dateFieldRoundStr,
            showPicker,
            value
        }
    }, 
    data() {
        const that = this 
        return {
            link:"",
            postData:{
                link:"",
                username:"", 
                linkType:"",
                openid:"",
                months:0,
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
            this.postData.months = this.dateFieldRound[index] 
            console.log(this.postData)
            
        },


        onChange (value, index) {
             console.log(`当前值: ${value}, 当前索引: ${index}`);
        },
        
        onCancel () { this.setPicker(false)}
            
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

    .text-center{text-align: center;}
   .padding { padding: 10px;  }
   .padding-1 {padding: 15px; }
   .padding-2 {padding: 20px; }
   .padding-3 {padding: 30px; }
   
   .margin-top{margin-top: 10px;} 
   .margin-top-1{margin-top: 20px;} 
   .margin-top-2{margin-top: 30px;} 
   .margin-top-3{margin-top: 40px;} 
   

</style>