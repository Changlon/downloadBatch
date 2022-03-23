<script>
import { ref } from '@vue/reactivity'
import {useRoute} from "vue-router" 
import { watch } from '@vue/runtime-core'
  
  export default { 
    setup() { 
      let  tabbarActive = ref('home') 
      let  path = ref('/home')
      const route = useRoute() 

      //监听路由变化, /sub订阅页面不需要 tarbar
      watch(()=>route.path,()=>{
        path.value = route.path
      })
      return {
        tabbarActive,
        path
      }
    },
    methods:{
      toggle() {
        alert("yes")
      }
    }
  }
</script>

<template>

<router-view  />

<van-tabbar v-model="tabbarActive" v-show="(path!=='/sub')" >
  <van-tabbar-item  replace to ="/home" name="home" icon="down">批量下载</van-tabbar-item>
  <van-tabbar-item  replace to="/record" name = "record" icon="photo-o">下载记录</van-tabbar-item>
</van-tabbar>
 
</template>

<style>

  

</style>
