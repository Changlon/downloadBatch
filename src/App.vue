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

      const excludeRoutes = [
        "/sub",
        "/order",
        "/imageDownload",
        "/imageList",
        "/historyList"

      ]


      return {
        tabbarActive,
        path,
        excludeRoutes
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

 <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component"  v-if="$route.meta.keepAlive" :key="$route.name"/>
    </keep-alive>
    <component :is="Component"  v-if="!$route.meta.keepAlive"/>
     <!-- <component :is="Component" />  -->
  </router-view> 



<van-tabbar v-model="tabbarActive"  v-show="(!excludeRoutes.includes(path))" >
  <van-tabbar-item  replace to ="/home" name="home" icon="down">批量下载</van-tabbar-item>
  <van-tabbar-item  replace to="/record" name = "record" icon="photo-o">下载记录</van-tabbar-item>
</van-tabbar>
 
</template>

<style>
   .text-center{text-align: center;}
   .padding { padding: 10px;  }
   .padding-1 {padding: 15px; }
   .padding-2 {padding: 20px; }
   .padding-3 {padding: 30px; }
   
   .padding-left { padding: 10px;  }
   .padding-left-1 {padding: 15px; }
   .padding-left-2 {padding: 20px; }
   .padding-left-3 {padding: 30px; }

   .padding-bottom { padding: 20px;  }
   .padding-bottom-1 {padding: 25px; }
   .padding-bottom-2 {padding: 30px; }
   .padding-bottom-3 {padding: 40px; }

    .padding-top { padding: 20px;  }
   .padding-top-1 {padding: 25px; }
   .padding-top-2 {padding: 30px; }
   .padding-top-3 {padding: 40px; }
   

   .margin-top{margin-top: 10px;} 
   .margin-top-1{margin-top: 20px;} 
   .margin-top-2{margin-top: 30px;} 
   .margin-top-3{margin-top: 40px;} 

   .margin-left{margin-top: 10px;} 
   .margin-left-1{margin-top: 20px;} 
   .margin-left-2{margin-top: 30px;} 
   .margin-left-3{margin-top: 40px;} 
   
   .shenglue{overflow: hidden; text-overflow: ellipsis; white-space: nowrap; word-break: break-word; display: inline-block;width: 150px; }
   .shenglue-sm{overflow: hidden; text-overflow: ellipsis; white-space: nowrap; word-break: break-word; display: inline-block;width: 150px; }
   
  
  @font-face {
  font-family: 'my-post';  /* project id 3280639 */
  src: url('');
  src: url('?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_3280639_s8y64i3rlfi.woff2') format('woff2'),
  url('//at.alicdn.com/t/font_3280639_s8y64i3rlfi.woff') format('woff'),
  url('//at.alicdn.com/t/font_3280639_s8y64i3rlfi.ttf') format('truetype'),
  url('#iconfont') format('svg');
}

.my-post {
  font-family: 'my-icon';
}

.my-post-tiezi::before {
  content: '&#xe624';
}

</style>
