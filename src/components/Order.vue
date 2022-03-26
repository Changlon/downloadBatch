<template>

        <div class="top-bar">
            <a class="iconfont icon-left"></a>
            <span>会员中心</span>
            <i class="iconfont icon-more"></i>
        </div>
        <div class="container">
            <!-- 通知 -->
            <div class="notice">
                <p><i class="iconfont icon-laba1"></i>邀请Ins好友成为会员，赢取更多福利</p>
                <button @click="share"><span>邀请</span><i class="iconfont icon-sanjiaoyou"></i></button>
            </div>
            <!-- banner -->
            <div class="banner">
                <h4>开通年卡 买一年送一年</h4>
                <p>开通立返100元无门槛优惠券</p>
                <i class="iconfont icon-huangguan"></i>
            </div>
        </div>
        <!-- 套餐权益 -->
        <div class="qy-tc">
            <h2><span>SVIP 年卡会员权益</span> </h2>
            <div class="qy">
                <ul>
                    <li>
                        <div class="icon"><i class="iconfont icon-shangshengqushi"></i></div>
                        <p>批量下载</p>
                    </li>
                    <li>
                        <div class="icon"><i class="iconfont icon-rmb"></i></div>
                        <p>博主订阅</p>
                    </li>
                    <li>
                        <div class="icon"><i class="iconfont icon-quan"></i></div>
                        <p>套餐优惠</p>
                    </li>
                    <li>
                        <div class="icon"><i class="iconfont icon-home"></i></div>
                        <p></p>
                    </li>
                </ul>
            </div>
            <h2><span>会员套餐</span><a><i class="iconfont icon-info"></i>会员套餐</a></h2>
            <div class="tc">
                <ul>
                    <li v-for="(item,index) in list" :class="item.checked?'on':''" @click="chooseTc(index)" :key="index">
                        <p>{{item.name}}</p>
                        <p><span>¥</span>{{item.price}}</p>
                        <p>原价:¥{{item.oldprice}}</p>
                        <i>立省{{item.oldprice - item.price}}</i>
                    </li>
                </ul>
            </div>
            <!-- 协议 -->
            <div class="agreement">
                <i class="iconfont" :class="agreement?'icon-radio-select':'icon-radio-none'"></i>
                <p @click="agreement=!agreement"><span>已阅读并同意</span><a href="#">《商城交易协议》</a><a href="#">《网络安全健康协议》</a>
                </p>
            </div>
            <!-- 开通会员 -->
            <div class="submit">
                <i>限时买一年送一年</i>
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
            list: [{
                id: 1,
                name: '连续包年',
                price: '189',
                oldprice: '389',
                checked: true
            }, {
                id: 2,
                name: '连续包季',
                price: '59',
                oldprice: '159',
                checked: false
            }, {
                id: 3,
                name: '连续包月',
                price: '29',
                oldprice: '39',
                checked: false
            }],
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