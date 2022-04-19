<template>

        <!-- <div class="top-bar">
            <a class="iconfont icon-left"></a>
            <span>会员中心</span>
            <i class="iconfont icon-more"></i>
        </div> -->
        <div class="container">
            <!-- 通知 -->
            <div class="notice">
                <p><i class="iconfont icon-laba1"></i>邀6好友关注公众号，获一周下载体验包!</p>
                <button @click="share"><span>邀请</span><i class="iconfont icon-sanjiaoyou"></i></button>
            </div>
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
                        <p>App下载</p>
                    </li>
                    
                </ul>
            </div>
            <h2><span>会员套餐</span><a><i class="iconfont icon-info"></i>会员套餐</a></h2>
            <div class="tc">
                <ul>
                    <li v-for="(item,index) in list" :class="item.checked?'on':''" @click="chooseTc(index)" :key="index">
                        <p>{{item.name}}</p>
                        <p><span>¥</span>{{item.price}}</p>
                        <p >   {{typeof item.oldprice =='number' ? '原价:¥' + item.oldprice: item.oldprice}}</p>
                        <i v-show="typeof item.oldprice =='number'">立省{{item.oldprice - parseInt(item.price)}}</i>
                    </li>
                </ul>
            </div>
            
            <!-- 开通会员 -->
            <div class="submit">
                <!-- <i>限时买一年送一年</i> -->
                <button @click="submit">立即开通会员</button>
            </div>
             
        </div>


</template>

<script>
export default {
    name:"Order",
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
                if (!this.agreement) {
                    // layer.open({
                    //     content: '请勾选同意协议',
                    //     skin: 'msg',
					// 	time: 2
                    // });
                    return
                }
                // layer.open({
                //     content: '您选择了' + this.selected.name+'<br>'+'价格：'+this.selected.price,
                //     btn: '确定'
                // });
            }
        }

}
</script>

<style  scoped>
  @import url(../assets/css/iconfont.css);
  @import url(../assets/css/style.css);
  
</style>