<template>
  
      <div class="sub-box">

          <van-search shape = "round" v-model="searchTxt" placeholder="请输入博主的名字，拼音，或ID" />

            <van-tree-select        
              height="740px"
              v-model:main-active-index="activeIndex"
              :items="items"
            >
              <template #content> 
                    <van-cell v-for="item in list" :key="item" >
                         <template v-slot:icon> 
                            <van-image
                              round
                              width="50px"
                              height="50px"
                              fit="fill"
                              position="left"
                              src="https://cdn.jsdelivr.net/npm/@vant/assets/cat.jpeg"
                              />
                         </template> 
                           
                        <template v-slot:title>  <span style="padding-left:4px" class="shenglue-sm">烫了个奥术大师多撒原啊阿萨德阿萨德</span> </template> 
                      
                        <template v-slot:value> <van-button color="#7232dd" size="mini">订阅</van-button>  </template> 
                      
                        <template v-slot:label> <span style="padding-left:4px">tanglasdasdaff</span>  </template>  
                  </van-cell>
                
                
              </template>
            </van-tree-select>

            <div class="ins-list">
                <div class="ins-list-num">找到了 {{2}} 个结果</div>
                <van-list
                  v-model:loading="loading"
                  :finished="finished"
                  finished-text="没有更多了"
                  @load="onLoad"
                >
                  <van-cell v-for="item in list" :key="item" >
                         <template v-slot:icon> 
                            <van-image
                              round
                              width="50px"
                              height="50px"
                              fit="fill"
                              position="left"
                              src="https://cdn.jsdelivr.net/npm/@vant/assets/cat.jpeg"
                              />
                         </template> 
                        <template v-slot:title>  <span style="padding-left:10px" class=" shenglue">烫了个奥术大师多撒原啊阿萨德阿萨德</span> </template> 
                        <template v-slot:value> <van-button color="#7232dd" size="small">订阅</van-button>  </template> 
                        <template v-slot:label> <span style="padding-left:10px">tanglasdasdaff</span>  </template> 
                  </van-cell>
                
                </van-list>
            </div>

      </div>

</template>

<script>
import { ref } from '@vue/reactivity';
import { watch } from '@vue/runtime-core';

export default {
    name:"Subscribe", 
    setup() {
      const activeIndex = ref(0) 
      const searchTxt = ref("")

      watch(searchTxt,(current)=>{  
          //TODO : 查询博主接口

      }) 


      const list = ref([]) 
      const loading = ref(false)
      const finished = ref(false)

      const onLoad = () => {
        // 异步更新数据
        // setTimeout 仅做示例，真实场景中一般为 ajax 请求
        setTimeout(() => {
          for (let i = 0; i < 10; i++) {
            list.value.push(list.value.length + 1);
          }

          // 加载状态结束
          loading.value = false;

          // 数据全部加载完成
          if (list.value.length >= 40) {
            finished.value = true;
          }
        }, 500);
      } 

      return {
        list,
        loading,
        finished,
        onLoad,
        activeIndex,
        searchTxt, 
        items: [
          { text: '订阅' },
          { text: '热门' },
          { text: '全部' },
          { text: '内地' },
          { text: '港台' },
          { text: '泰国' },
          { text: '日韩' },
          { text: '欧美' },
          { text: '星粉' },
          { text: '萌娃' },
          { text: '品牌' },
          { text: '穿搭' },
          { text: '美甲' },
          { text: '美妆' },
          { text: '美发' },
          { text: '纹身' },
          { text: '美女' },
          { text: '体育' },
          { text: '美食' },
          { text: '摄影' },
          { text: '花艺' },
          { text: '艺术' },
          { text: '旅行' } 
        ]
        
      }
    },


}
</script>

<style scoped>

.sub-box {padding: 15px 0px;position: relative;width: 100%;overflow-x: hidden;font-size: 16px;margin: 0 auto;}
.ins-list-num{background: 	#F5F5F5;font-size: 14px;padding: 8px 4px;font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;letter-spacing: 2px;}


/deep/ .van-tree-select__nav{flex: 0.5;}
</style>