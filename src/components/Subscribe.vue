<template>
  
      <div class="sub-box">

          <van-search shape = "round" v-model="searchTxt" placeholder="请输入博主的名字，拼音，或ID" />

            <van-tree-select        
              height="740px"
              v-model:main-active-index="activeIndex"
              :items="items"
              v-show="!searchTxt"
              @click-nav = "clickNav"
            >
              <template #content> 
                  <van-list
                    v-model:loading="loading"
                    :finished="finished"
                    finished-text="没有更多了"
                    @load="onLoad"
                  >
                      <van-cell v-for="item in insUserList" :key="item" >
                         <template v-slot:icon> 
                            <van-image
                              round
                              width="50px"
                              height="50px"
                              fit="fill"
                              position="left"
                              :src="item.profile_url"
                              />
                         </template> 
                           
                        <template v-slot:title>  <span style="padding-left:4px" class="shenglue-sm">{{item.username}}</span> </template> 
                      
                        <template v-slot:value> <van-button color="#7232dd" size="mini">{{item.is_sub ?  "取消订阅" : "订阅"}}</van-button>  </template> 
                      
                        <template v-slot:label> <span style="padding-left:4px">{{item.account}}</span>  </template>  
                  </van-cell>
                
                </van-list>
                  
                
                
              </template>
            </van-tree-select>

            <div class="ins-list" v-show="searchTxt" >
                <div class="ins-list-num">找到了 {{searchList.length}} 个结果</div>
                <van-cell v-for="item in searchList" :key="item" >
                         <template v-slot:icon> 
                            <van-image
                              round
                              width="50px"
                              height="50px"
                              fit="fill"
                              position="left"
                              :src="item.profile_url"
                              />
                         </template> 
                        <template v-slot:title>  <span style="padding-left:10px" class=" shenglue">{{item.username}}</span> </template> 
                        <template v-slot:value> <van-button color="#7232dd" size="small">{{item.is_sub ?  "取消订阅" : "订阅"}}</van-button>  </template> 
                        <template v-slot:label> <span style="padding-left:10px">{{item.account}}</span>  </template> 
                  </van-cell>
              
            </div>

      </div>

</template> 

<script>
import { ref } from '@vue/reactivity';
import { onMounted, watch } from '@vue/runtime-core';
import {searchInsUser,getAllCategorites,searchInsUserByCategory} from "../common"
export default {
    name:"Subscribe", 
    setup() {
      const activeIndex = ref(0) 
      const searchTxt = ref("")
      const searchList = ref([]) 

      const insUserList = ref([])
      const loading = ref(true)
      const finished = ref(false)
      const start = ref(1) 
      
      const items = ref([]) //左侧分类
      const cateId = ref(0) 

      

      const clickNav = async (index)=>{
            const {id} = items.value[index] 
            cateId.value = id
            start.value = 1 
            insUserList.value = [] 
            loading.value = true 
            finished.value = false
            let res = await searchInsUserByCategory({cateId:cateId.value,start:start.value})   
            loading.value = false
            insUserList.value = res.data 
            insUserList.value.length >= res.total ? finished.value = true : finished.value = false
      }

      watch(searchTxt,async (name)=>{  
          //TODO : 查询博主接口
          const res = await searchInsUser({name,start:start.value})
          searchList.value = res.data
          // start.value = ( start.value + res.data.length)
      }) 


      const onLoad = async () => {

          loading.value = true 
          let res  = await searchInsUserByCategory({cateId:cateId.value, start : start.value}) 
          loading.value = false 
          insUserList.value = [...insUserList.value,...res.data] 
          insUserList.value.length >= res.total ? finished.value = true : finished.value = false
      } 

      onMounted(async ()=>{
        let res = await getAllCategorites() 
        items.value = res.data 
        cateId.value = items.value[0]
        res  = await searchInsUserByCategory({cateId:cateId.value, start : start.value})
        insUserList.value = res.data
        loading.value = false
        insUserList.value.length >= res.total ? finished.value = true : finished.value = false
      })

      return {
        searchList,
        insUserList,
        loading,
        finished,
        onLoad,
        clickNav,
        activeIndex,
        searchTxt, 
        start,
        items
        
      }
    },


}
</script>

<style scoped>

.sub-box {padding: 15px 0px;position: relative;width: 100%;overflow-x: hidden;font-size: 16px;margin: 0 auto;}
.ins-list-num{background: 	#F5F5F5;font-size: 14px;padding: 8px 4px;font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;letter-spacing: 2px;}

 * /deep/ .van-tree-select__nav{flex: 0.5;}  
</style>