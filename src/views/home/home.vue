<template>
  <div id="home">
    <nav-bar class="home-nav">
      <template v-slot:center>
          购物街
      </template>
    </nav-bar>
    <tab-control class="tab-control" :titles="['流行','新款','精选']" @tabClick="tabClick"
                 ref="tabControl1" v-show="isTabFixed" ></tab-control>
    <scroll class="content"
            ref="scroll" :probe-type='3'
            @scroll='contentScroll'
            :pull-up-load='true'
            @pullingUp="loadMore"
            :observeImage='true'>
    <home-swiper :banners="banners" @swiperImagLoad="swiperImagLoad" ></home-swiper>
    <home-recommend :recommends="recommends"></home-recommend>
    <feature-view></feature-view>
    <tab-control  :titles="['流行','新款','精选']" @tabClick="tabClick"
                 ref="tabControl2" ></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
      <back-top @click.native="backClick" v-show="showTop"></back-top>

    </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/content/backTop/BackTop";

import HomeSwiper from "./childComps/HomeSwiper";
import HomeRecommend from "./childComps/HomeRecommend";
import FeatureView from "./childComps/FeatureView";

import {getHomeGoods,getHomeMultidata} from "network/home";
import bus from '@/bus'
import {debounce} from "common/utils";



//耦合度高
// import BScroll from "better-scroll";

export default {
  name: "home",
  components:{
    GoodsList,
    NavBar,
    HomeSwiper,
    HomeRecommend,
    FeatureView,
    TabControl,
    Scroll,
    BackTop,

  },
  data(){
    //请求回来的数据
    return{
      banners:[],
      recommends:[],
      goods:{
        'pop':{page:0,list:[]},
        'new':{page:0,list:[]},
        'sell':{page:0,list:[]},
      },
      //默认类型
      currentType:'pop',
      showTop: false,
      tabOffsetTop: 0, //判断滚动
      isTabFixed: false, //默认不吸顶
      saveY: 0,

      itemImgListener: null //通过混入mixins导入
    }
  },
  computed:{
    showGoods(){
      return this.goods[this.currentType].list
    }
  },
  activated() {
    this.$refs.scroll.scrollTo(0,this.saveY,0)
  },
  deactivated() {
    // 保存离开时的位置信息到this.saveY
    this.saveY = this.$refs.scroll.getScrollY()
    console.log(this.saveY);
    // 2.取消全局事件监听（主页图片加载的监听）因为此时设置了keep-alive，所以离开时调用的是deactivated()
    bus.$off('itemImageLoad',this.itemImgListener)
  },

  created() {
  //  首页创建完创建网络请求
  //  1.请求多个数据
    this.getHomeMultidata()


      //将数据存起来，不会被回收，回收了但没有全部回收

  //  2.请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')



  },
  //挂载
  mounted() {

    // 1.监听goodslistitem图片加载完成
    // 默认程序没有$bus==>在mian.js添加原型
    const refresh =  debounce(this.$refs.scroll.refresh,50)
    this.itemImgListener = () => { refresh() }
    // bus.$on('itemImageLoad',() => {
    //   // this.$refs.scroll.refresh()
    //   refresh() // 此处是闭包，局部变量不会被销毁
    // })
  //  对监听事件进行保存
    bus.$on('itemImageLoad',this.itemImgListener)
  },
  methods: {
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
      this.$refs.tabControl1.currentIndex = index
      this.$refs.tabControl2.currentIndex = index
    },

    // debounce(func, delay) {
    //   let timer = null
    //   //返回一个新的函数
    //   //发现有新的进来就马上将之前的清楚掉
    //   return function (...args) {
    //     if (timer)
    //       clearTimeout(timer)
    //     timer = setTimeout(() => {
    //       func.apply(this, args)
    //     }, delay)
    //   }
    // },
    backClick() {
      // this.$refs.scroll.scroll.scrollTo(0,0,1000)
      this.$refs.scroll.scrollTo(0, 0)
    },
    //用于获取页面的位置，当滑到相应位置就会设置为true
    contentScroll(position) {
      // console.log(position.y)
      // this.showTop = (-position.y) > 1000  绝对值Math.abs
      //1.判断BackTop是否显示
      this.showTop = Math.abs(position.y) > 1000
      // 2.设置吸顶效果 决定tabControl是否吸顶（position：fixed
      this.isTabFixed = (-position.y) > this.tabOffsetTop
    },
    loadMore() {
      this.getHomeGoods(this.currentType)
    },
    swiperImagLoad(){
      // 2.获取tabControl的offsetTop
      //  所有组件都有一个属性$el:用于获取组件元素
      this.tabOffsetTop= this.$refs.tabControl2.$el.offsetTop;
    },
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        //将数据存起来，不会被回收，回收了但没有全部回收
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      })
    },

    getHomeGoods(type) {
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1  /* 更新data中的页码 */
        //因为上拉加载默认执行一次，所以需要finish
        this.$refs.scroll.finishPullUp() // 调用方法，多次上拉加载更多
      })
    },

  }
}
</script>

<style scoped>
/*scoped样式只针对当前组件*/
#home{
  height: 100vh;
  position: relative;
}
.home-nav{
  background-color: var(--color-tint);
  color: #fff;
  /*在使用浏览器原生滚动*/
  /*position: fixed;*/
  /*left: 0;*/
  /*right: 0;*/
  /*top: 0;*/
  /*z-index: 9;*/

}
.content {
  /*/* 方法一：计算*/
  /*height: calc(100%- 93px);*/
  /*overflow:hidden;*/
  /*position: absolute;*/
  /*color: #ccc;*/
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
}
.tab-control{
  position: relative;
  /*top: 44px;*/
  z-index: 9;
}
.fixed{
  position: fixed;
  left: 0;
  top: 44px;
  right: 0;
}
</style>
