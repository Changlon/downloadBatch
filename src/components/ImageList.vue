<template>
<van-nav-bar  left-text="返回"
  left-arrow title="资源列表" 
   @click-left="onClickLeft"
   />
<van-loading size="34px" v-show="loadding" vertical style="text-align:center;">加载中...</van-loading>


</template>

<script> 
import { ref } from '@vue/reactivity' 
import request from "../api" 

console.log(request)
export default { 
    name:"ImageList", 
    setup() {
        const loadding = ref(true) 
        const onClickLeft = ()=>{history.back()}
        return {
            loadding,
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
        console.log(postParams)
    }

}
</script>

<style>

</style>