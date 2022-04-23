<template>

<van-nav-bar  left-text="返回"
  left-arrow title="下载记录" 
   @click-left="onClickLeft"
   />

<van-list
  v-model:loading="loading"
  :finished="finished"
  finished-text="没有更多了"
  @load="onLoad"
>

  <van-cell v-for="item in list" :key="item"  > 
      
        <template v-slot:icon> 
               
        </template> 
        <template v-slot:title>  <span style="padding-left:4px" class="shenglue-sm">博主: {{item.insUsername}} </span> </template> 
        
        <template v-slot:value> 
             <van-button color="#7232dd" size="mini" @click="viewHistory(item.historyId,item.insUsername)">查看</van-button>  
             </template> 
        
        <template v-slot:label>  
            <span style="padding-left:4px"> 时间 ： {{formatHistoryTimestamp(item.messionTimestamp*1000)}}
            </span>
        </template>  
  </van-cell>
</van-list>


<div class="padding-bottom-3"></div>


</template>

<script>
import { ref } from '@vue/reactivity'
import { get } from '../utils'
import { Notify } from 'vant'
import { queryBatchHistory } from '../common'
import { watch } from '@vue/runtime-core'
import { useRouter } from 'vue-router'

export default {
    name:"Record",
    setup() { 

        let openid = ref("") 
        let loading = ref(true)
        const list = ref([])
        const finished = ref(false) 
        const $router =  useRouter() 

        watch(list,(current)=>{  
            list.value = current.sort((a,b)=>(b.messionTimestamp - a.messionTimestamp ))
        },{deep:true})

        const formatHistoryTimestamp = timestamp =>{ 
            const date = new Date(timestamp) 
            return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`

        }

        const onLoad = async () => { 

             let res = await queryBatchHistory(openid.value) 
           
             loading.value = false 
             finished.value = true 
            
             if(res.code === 0 ) {
                 list.value = res.data 
                  Notify({type:"success",message:res.msg,duration:1000})
             }else{
                 Notify({type:"danger",message:res.msg,duration:2000}) 
             }
        }

         let onClickLeft = ()=>{$router.push({name:"home"})} 

         let viewHistory = (hId,username)=>{ 
             console.log(hId,username)
             $router.push({name:"historyList",params:{hId,openid:openid.value,username}})
             
         }

            
        return {
            openid,
            loading,
            list, 
            finished,
            onLoad ,
            formatHistoryTimestamp,
            onClickLeft,
            viewHistory

        }

    },
    created() {
        this.openid = get("openid") 
        if(!this.openid) {
            Notify({type:"danger",message:"没有检测到用户的openid,请重新打开进入!",duration:2000})
        }
    }
   
} 

</script>


<style>

</style>