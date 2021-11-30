<template>
<!--详情页-->
  <div id="detail">
    <detail-nav-bar ref="nav" class="detail-nav" @clickTitle="clickTitle" :titles="['商品','参数','评论','推荐']"/>
    <scroll class="content"
            ref='scroll'
            :probe-type='3'
            @scroll="contentScroll"
            :observeImage='true'>
<!--      属性topImages传入值top-images-->
    <detail-swiper :top-images="topImages"></detail-swiper>
    <detail-base-info :goods="goods"></detail-base-info>
    <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imgLoad='imgLoad'></detail-goods-info>
      <detail-param-info ref="params" :param-info="paramInfo"></detail-param-info>
      <detail-commont-info ref="comment" :comment-info="commentInfo"></detail-commont-info>
      <goods-list ref="recommend" :goods="recommends"></goods-list>
    </scroll>
    <detail-bottom-bar @addCart='addToCart'></detail-bottom-bar>
    <back-top v-show='isShowBackTop' @click.native="backTop"></back-top>
  </div>
</template>

<script>
import DetailNavBar from "./childComponents/DetailNavBar";
import {getDetail,Goods,Shop,GoodsParam,getRecommend} from "network/detail";
import DetailSwiper from "./childComponents/DetailSwiper";
import DetailBaseInfo from "./childComponents/DetailBaseInfo";
import DetailShopInfo from "./childComponents/DetailShopInfo";
import Scroll from "components/common/scroll/Scroll";
import DetailGoodsInfo from "./childComponents/DetailGoodsInfo";
import DetailParamInfo from "./childComponents/DetailParamInfo";
import DetailCommontInfo from "./childComponents/DetailCommontInfo";
import GoodsList from "components/content/goods/GoodsList";
import DetailBottomBar from "./childComponents/DetailBottomBar";
import BackTop from "components/content/backTop/BackTop";
import bus from '@/bus'
import {debounce} from "common/utils";

export default {
  name: "Detail",
  components:{
    GoodsList,
    DetailGoodsInfo,
    DetailShopInfo,
    DetailBaseInfo,
    DetailNavBar,
    DetailSwiper,
    Scroll,
    DetailParamInfo,
    DetailCommontInfo,
    DetailBottomBar,
    BackTop
  },
  data(){
    return{
      iid:null,
      topImages:[],
      goods: {},
      shop:{},
      detailInfo:{},
      paramInfo:{},
      commentInfo:{},
      recommends:[],
      itemImageListener:null,
      topYs: [],
      getTopYs: null,
      currentIndex: 0,
      isShowBackTop: false
    }
  },

  created() {
    //1.获取iid
    this.iid=this.$route.params.iid;
    getDetail(this.iid).then(res =>{
    //  1.获取顶部轮播数据
    //   console.log(res);
      this.topImages=res.result.itemInfo.topImages
    //  2.获取商品信息
      this.goods=new Goods(res.result.itemInfo,res.result.columns,res.result.shopInfo.services)

    //  3.创建店铺信息的对象
      this.shop=new Shop(res.result.shopInfo)
    //  4.保存商品的详情数据
      this.detailInfo=res.result.detailInfo
    //  5.获取参数信息
      this.paramInfo=new GoodsParam(res.result.itemParams.info,res.result.itemParams.rule)
    //6.获取用户评论
    //  评论不为空的时候
      if (res.result.rate.cRate!==0){
        this.commentInfo=res.result.rate.list[0]
      }

    })
    //2.获取评论
    getRecommend().then(res => {
      // console.log(res);
      this.recommends = res.data.list
    })
    // 3. 为topYs设置防抖
    this.getTopYs = debounce(() => {
      this.topYs = []
      this.topYs.push(0)
      this.topYs.push(this.$refs.params.$el.offsetTop)
      this.topYs.push(this.$refs.comment.$el.offsetTop)
      this.topYs.push(this.$refs.recommend.$el.offsetTop)
      this.topYs.push(Number.MAX_VALUE) // 在数组末尾增加一个无限大的值，为了之后对数组做遍历
      console.log(this.topYs)
    },100)
  },
  mounted() {
    const refresh =  debounce(this.$refs.scroll.refresh,50)
    this.itemImageListener=() =>{
      refresh()
    }
    bus.$on('itemImgLoad',this.itemImageListener)

  },

  deactivated() {
    bus.$off('itemImgLoad',this.itemImageListener)
  },

  methods: {
    imgLoad() {
      // console.log('/////'); 老师这里会刷新多次，但我这里只刷新一次
      this.$refs.scroll.refresh()
      this.getTopYs()
      // this.topYs = []
      // this.topYs.push(0)
      // this.topYs.push(this.$refs.params.$el.offsetTop)
      // this.topYs.push(this.$refs.comment.$el.offsetTop)
      // this.topYs.push(this.$refs.recommend.$el.offsetTop)
      // console.log(this.$refs.params.$el.offsetTop) //老师这里会刷新多次，但我这里只刷新一次
    },
    //点击跳转到对于位置
    clickTitle(index) {
      this.currentIndex = index
      console.log(index);

      this.$refs.scroll.scrollTo(0, -this.topYs[index], 1000)
    },
    //滚动内容对应标题
    contentScroll(position) { // 根据scroll组件发出的scroll事件，获取到position值
      // 1.获取y值
      // console.log(position);
      const positionY = -position.y
      // 2.将y值与组件内容高度做对比
      // console.log(this.topYs[0]); // 这里是undefined，得不到它的值，并且即使得到了也应该为负值，
      // console.log(positionY);
      let length = this.topYs.length
      // for(let i in this.topYs)  此方法获取的 i为字符串 要用parseInt(i) 或者 i*1 的方法将其转为数值
      // for(let i=0;i<length;i++){
      // if(this.topYs[i].positionY >=0 && this.topYs[i].positionY < this.topYs[i+1].positionY)
      //   console.log(this.topYs[i]);
      // console.log(this.topYs.length);
      // 1.普通做法
      // if(this.currentIndex !== i && ((i < length -1 && positionY >= this.topYs[i] && positionY < this.topYs[i+1]) || (i === length -1 && positionY >= this.topYs[i]))){
      // 2.hack做法，在数组后面加一个无限大的值，并且遍历时只遍历到 i<length-1
      for (let i = 0; i < length - 1; i++) {
        if (this.currentIndex !== i && (i < length - 1 && positionY >= this.topYs[i] && positionY < this.topYs[i + 1])) {
          this.currentIndex = i
          console.log(i); // 因为此时打印非常频繁，所以将当前index保存为一个变量，在两个不等的情况下才打印，就不会很频繁
          console.log(this.topYs[i]); // 此处的值是正值
          this.$refs.nav.currentIndex = this.currentIndex
        }
      }
      // 是否显示回到底部按钮的判断
      this.isShowBackTop = positionY > 1000
    },
    backTop () {
      this.$refs.scroll.scrollTo(0,0)
    },
    addToCart() {
      // 1.获取购物车需要展示的信息，因为有多个信息，所以可以放在一个对象里
      const product = {}
      product.image = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.realPrice
      product.iid = this.iid // id一定要传，因为id是商品的唯一标识，是将id传给服务器获取到对应的商品

      // 2.将商品添加到购物车里
      // this.$store.commit('addCart',product) commit是将product提交到store中mutations里的方法addCart
      this.$store.dispatch('addCart', product)  // dispatch是提交到actions里去，再由actions分发commit到mutations里不同的方法中去
        // 3.如果添加购物车成功（用promise监视成功与否）
        .then(res => {
          // console.log(res);
          // this.isShow = true
          // this.message = res
          // setTimeout(() => {
          //   this.isShow = false
          // },1000)
          this.$toast.show(res, 1000)
        })
    }
  }
}
</script>

<style scoped>
#detail{
  position: relative;
  z-index: 9;
  background-color:#fff;
  height: 100vh;
}
.content{
  height: calc(100% - 44px - 58px);
  overflow: hidden;
}
.detail-nav{
  position: relative;
  z-index: 9;
  background-color: #fff;
}
</style>
