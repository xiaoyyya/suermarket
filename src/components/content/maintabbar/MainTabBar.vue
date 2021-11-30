<template>
    <tab-bar>
      <tab-bar-item path="home" activeColor="#000">
        <template v-slot:item-icon>
          <img src="~/assets/img/tabbar/home.svg" alt="">
        </template>
        <template v-slot:item-icon-active>
          <img src="~/assets/img/tabbar/homefile.svg" alt="">
        </template>
        <template v-slot:item-text>
          <div class="text">首页</div>
        </template>
      </tab-bar-item>
      <tab-bar-item path="category" activeColor="#000">
        <template v-slot:item-icon>
          <img src="~/assets/img/tabbar/category.svg" alt="">
        </template>
        <template v-slot:item-icon-active>
          <img src="~/assets/img/tabbar/categoryfile.svg" alt="">
        </template>
        <template v-slot:item-text>
          <div class="text">分类</div>
        </template>
      </tab-bar-item>
      <tab-bar-item path="cart" activeColor="#000">
        <template v-slot:item-icon>
          <img src="~/assets/img/tabbar/cat.svg" alt="">
        </template>
        <template v-slot:item-icon-active>
          <img src="~/assets/img/tabbar/catfile.svg" alt="">
        </template>
        <template v-slot:item-text>
          <div class="text">购物车</div>
        </template>
      </tab-bar-item>
      <tab-bar-item path="profile" activeColor="#000">
        <template v-slot:item-icon>
          <img src="~/assets/img/tabbar/me.svg" alt="">
        </template>
        <template v-slot:item-icon-active>
          <img src="~/assets/img/tabbar/mefile.svg" alt="">
        </template>
        <template v-slot:item-text>
          <div class="text">我的</div>
        </template>
      </tab-bar-item>
    </tab-bar>
</template>

<script>
import TabBar from "../../common/tabbar/TabBar";
import TabBarItem from "../../common/tabbar/TabBarItem";
export default {
  name: "MainTabBar",
  components:{
    TabBarItem,
    TabBar
  }
}
</script>

<style scoped>
  img{
    width: 24px;
    height: 24px;
    vertical-align: middle;
    margin-bottom: 2px;
  }
  .text{
    font-size: 14px;
    text-align: center;
  }
</style>
