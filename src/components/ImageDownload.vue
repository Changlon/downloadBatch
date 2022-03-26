<template>
<van-nav-bar  left-text="返回"
  left-arrow title="下载帖子资源" 
   @click-left="onClickLeft"
   />



<div class="post-box ">
    <div class="post-type margin-top" >
        <van-checkbox v-model="checked" class="post-type-position" name="radio"  icon-size="24px"></van-checkbox>
        <van-image
            width="100px"
            height="100px"
            fit="fill"
            position="left"
            src="https://cdn.jsdelivr.net/npm/@vant/assets/cat.jpeg"
        />
    </div>

        <div class="post-type margin-top" >
        <van-checkbox v-model="checked" class="post-type-position" name="radio"  icon-size="24px"></van-checkbox>
        <van-image
            width="100px"
            height="100px"
            fit="fill"
            position="left"
            src="https://cdn.jsdelivr.net/npm/@vant/assets/cat.jpeg"
        />
    </div>


    <div class="post-type margin-top" >
        <van-checkbox v-model="checked" class="post-type-position" name="radio"  icon-size="24px"></van-checkbox>
        <van-image
            width="100px"
            height="100px"
            fit="fill"
            position="left"
            src="https://cdn.jsdelivr.net/npm/@vant/assets/cat.jpeg"
        />
    </div>

    <div class="post-type margin-top" >
        <van-checkbox v-model="checked" class="post-type-position" name="radio"  icon-size="24px"></van-checkbox>
        <van-image
            width="100px"
            height="100px"
            fit="fill"
            position="left"
            src="https://cdn.jsdelivr.net/npm/@vant/assets/cat.jpeg"
        />
    </div>

    <div class="post-type margin-top " >
        <van-checkbox v-model="checked" class="post-type-position" name="radio"  icon-size="24px"></van-checkbox>
        <van-image
            width="100px"
            height="100px"
            fit="fill"
            position="left"
            src="https://cdn.jsdelivr.net/npm/@vant/assets/cat.jpeg"
        />
    </div>
    
</div>


<div class="footer">
   <van-button plain hairline type="primary" @click="checkAll">{{checkAllText}}</van-button>
  <van-button  style="width:70%;margin-left:5px;" plain hairline type="primary" @click="download">下载</van-button>
</div> 




</template>

<script>
import { ref } from '@vue/reactivity'

export default { 
    name:"ImageDownload",
    setup() {
        let onClickLeft = ()=>{history.back()}
        let checked = ref(true)
        return {
            onClickLeft,
            checked
        }
    },
    data() {
        return {
            checkAllText:"全选"
        }
    },
    methods:{
        checkAll() { 
            this.checked = !this.checked 
            if(this.checked) this.checkAllText = "取消" 
            else this.checkAllText = "全选"
        },
        download() {
            alert("下载成功！")
        }
    }

}
</script>

<style scoped >
.post-box{padding: 10px;display: flex; flex-wrap: wrap;}
.post-img-wrap {padding: 20px;}
.post-type {position: relative;margin-left: 10px;}
.post-type-position{position:absolute;bottom: 18px;left: 8px;z-index: 1;color: #fff;}
.ins-user-subscriber-action{position:absolute;top: 5px;right: 1px;}
.footer{ width: 100%;position: fixed; bottom: 40px;text-align: center;}
</style>