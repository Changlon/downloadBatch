<template>

        <!-- <div class="top-bar">
            <a class="iconfont icon-left"></a>
            <span>会员中心</span>
            <i class="iconfont icon-more"></i>
        </div> -->
        <div class="container">
            <!-- 通知 -->
            <div class="notice">
                <p><i class="iconfont icon-laba1"></i>限时特惠，邀请好友关注领会员套餐</p>
                <button @click="share"><span>邀请</span><i class="iconfont icon-sanjiaoyou"></i></button>
            </div>

            <van-cell  >
                         <template v-slot:icon> 
                            <van-image
                              round
                              width="50px"
                              height="50px"
                              fit="fill"
                              position="left"
                              :src=" (commonUserInfo && commonUserInfo.avatarUrl ) || 'https://cdn.jsdelivr.net/npm/@vant/assets/cat.jpeg'"
                              />
                         </template> 
                        <template v-slot:title>  <span style="padding-left:10px" class=" shenglue">{{commonUserInfo && commonUserInfo.nickname}}</span> </template> 
                        <template v-slot:value> 

                             <span v-if="commonUserInfo &&( commonUserInfo.isVip===0 && commonUserInfo.isSvip ===0 )"> 尚未开通会员 </span>

                             <div v-else-if="commonUserInfo && commonUserInfo.isVip === 1"> 

                                 <van-tag v-if="commonUserInfo.isSvip" type="danger">SVIP</van-tag>
                                 <van-tag v-else-if="commonUserInfo.isVip" type="success">VIP</van-tag>

                                <div>会员期限 : {{dateFormat( new Date( commonUserInfo.expireTime),"%Y/%MM/%DD") }}</div>

                             </div>
                            
                        </template> 
                        <!-- <template v-slot:label> <span style="padding-left:10px">ID: 0xINS_{{commonUserInfo && commonUserInfo.commonUserId}}</span>  </template>  -->
                        
                  </van-cell>
                  
                <div class="notice">每天免费 3 次下载，开通会员畅享无限下载 </div> 
                
            <!-- banner -->
            <div class="banner">
                <h4>开通年卡 尊享SVIP特权</h4>
                <p>优惠套餐限时抢购</p>
                <i class="iconfont icon-huangguan"></i>
            </div>
        </div>
        <!-- 套餐权益 -->
        <div class="qy-tc">
            <h2><span>SVIP 年卡会员权益</span> </h2>
            <div class="qy">
                <ul>
                    <li>
                        <div class="icon"><i class="ins ins-jisu"></i></div>
                        <p>批量下载</p>
                    </li>
                    <li>
                        <div class="icon"><i class="ins ins-dingyue"></i></div>
                        <p>博主订阅</p>
                    </li>
                    <li>
                        <div class="icon"><i class="ins ins-xiaochengxu"></i></div>
                        <p>存图小程序</p>
                    </li>

                    <li>
                        <div class="icon"><i class="ins ins-app"></i></div>
                        <p>浏览器插件</p>
                    </li>
                    
                </ul>
            </div>
            <h2><span>会员套餐</span><a><i class="iconfont icon-info"></i>会员套餐</a></h2>
            <div class="tc">
                <ul>
                    <li v-for="(item,index) in orderItem" :class="item.checked?'on':''" @click="onOrderItemToggle(index)" :key="item.id">
                        <p>{{item.orderItemName}}</p>
                        <p><span>¥</span>{{item.orderItemPrice}}</p>
                        <p >   {{'原价:¥' + item.orderItemOldPrice}}</p>
                        <i >立省{{item.orderItemOldPrice - item.orderItemPrice}}</i>
                    </li>
                </ul>
            </div>
            
            <!-- 开通会员 -->
            <div class="submit">
                <!-- <i>限时买一年送一年</i> -->
                <button @click="createJSAPIOrder">立即开通会员</button>
            </div>
             
        </div>


</template>

<script>
import { ref } from '@vue/reactivity'
import { getOrderItem,createOrder, getUserInfo } from '../common'
import { onBeforeMount, onMounted, } from '@vue/runtime-core'
import { get, getQueryVariable, set,date2StrFormat_$01 } from '../utils'
import { Notify } from 'vant'
import { useRouter } from 'vue-router'
export default {
     name:"Order", 
     setup() { 
        
         const router = useRouter()         
         const openid = ref(getQueryVariable("openid") || get("openid")) 
         const orderItem = ref([])
         const selectedOrderItemIndex = ref(0) 
         const commonUserInfo = ref(null) 

         
        onMounted( async()=>{
             let res = await getOrderItem() 
             orderItem.value = res.data || [] 
             if(orderItem.value.length) {
                for(let i = 0 ; i< orderItem.value.length;++i) {
                    if(i === selectedOrderItemIndex.value) orderItem.value[i].checked = true 
                    else orderItem.value[i].checked = false
                }
             }
             console.log(openid.value,"onMounted")
            if(openid.value) {
                res =  await getUserInfo(openid.value) 
                commonUserInfo.value = res.data  
            }
           
         })    


         let onOrderItemToggle = (index)=>{  
             selectedOrderItemIndex.value = index
             for(let i = 0 ; i< orderItem.value.length;++i) {
                 if(i === index) orderItem.value[i].checked = true 
                 else orderItem.value[i].checked = false
             }
                
         } 


          let createJSAPIOrder = async ()=>{
              if(!openid.value) return  Notify("未检测到用户数据!")  
              if(orderItem.value.length<=0) return  Notify("没有可选择的套餐!")  
                let res = await createOrder(openid.value,orderItem.value[selectedOrderItemIndex.value]?.id).catch(err=>{ 
                    Notify(`支付失败服务器内部错误: ${err.message}`)
                }) 

                if(!res || !res.data) return 
                    /** 调起jsapi支付 */
                    if(WeixinJSBridge) {                        
                        WeixinJSBridge.invoke(
                        'getBrandWCPayRequest', {
                            "appId":res.data.appId,     //公众号ID，由商户传入     
                            "timeStamp": res.data.timeStamp,         //时间戳，自1970年以来的秒数     
                            "nonceStr":res.data.nonceStr, //随机串     
                            "package":res.data.packageValue,     
                            "signType":"MD5",         //微信签名方式：     
                            "paySign": res.data.paySign //微信签名 
                        },
                        function(res){ 
                            if(res.err_msg == "get_brand_wcpay_request:ok" ){
                                Notify({type:"success",message:"恭喜，支付成功!",duration:2000})   
                                router.go(0) 
                            } else {
                                Notify({type:"danger",message:"支付失败!",duration:2000})
                            }
                    }) 

                }
                    
             
          }  

        let dateFormat = (date,format) => date2StrFormat_$01(date,format)

         return {
             orderItem,
             selectedOrderItemIndex,
             openid,
             commonUserInfo,
             onOrderItemToggle,
             createJSAPIOrder ,
             dateFormat
         }

     },
     created() {
         console.log("created")
        this.openid = getQueryVariable("openid")  || get("openid") 
        console.log(getQueryVariable("openid")  || get("openid") )
        if(this.openid) set("openid",this.openid) 
     },

      data(){
        return {
            agreement: false,
            list: [

            {
                id: 1,
                name: '3天',
                price: 19,
                oldprice: 29,
                checked: true
            },
            

            {
                id: 2,
                name: '一个月',
                price: 29,
                oldprice: 59,
                checked: false
            },  


            {
                id: 3,
                name: '一个季度',
                price: '23/月',
                oldprice: 33*3,
                checked: false
            },
            
            {
                id: 4,
                name: '一年SIVP',
                price: 149,
                oldprice: 199,
                checked: false
            }, 


            {
                id: 5,
                name: '终身SVIP',
                price: '199', 
                oldprice: 299,
                checked: false
            }
        ],
            selected: {
                id: 1,
                name: '连续包年',
                price: '189',
                oldprice: '389',
                checked: true
            }
        
        }
      },
      methods: {
        // 邀请好友
        share(){
            // layer.open({
            //     content: '邀请好友更多好礼相送哦！',
            //     btn: '确定'
            // });
        },
        // 套餐选择
        chooseTc(index) {
            this.list.forEach((item) => {
                item.checked = false
            })
            this.list[index].checked = true
            this.selected = {}
            this.selected = this.list[index]
        },
        // 提交
        submit() {
         
        }
      }

}
</script>

<style  scoped>
  @import url(../assets/css/iconfont.css);
  @import url(../assets/css/style.css);

  .notice {font-size: 14px;}
  
</style>