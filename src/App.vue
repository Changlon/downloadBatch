<script>
import { ref } from '@vue/reactivity'

  
  export default { 
    setup() { 
      const tabbarActive = ref('home')
      return {
        tabbarActive
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

<router-view />

<van-tabbar v-model="tabbarActive">
  <van-tabbar-item  replace to ="/home" name="home" icon="down">批量下载</van-tabbar-item>
  <van-tabbar-item  replace to="/record" icon="photo-o">下载记录</van-tabbar-item>
</van-tabbar>
 
</template>

<style>

  

</style>
