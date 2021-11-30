<template>
  <div class="nav-bar">
    <div class="back" @click="backClick">
          <img src="~assets/img/common/back.svg" alt="">
    </div>
    <div class="tab-control">
      <div v-for="(item, index) in titles" :key="index"
           class="tab-control-items" :class="{active: index===currentIndex}"
           @click="titleClick(index)">
        <span>{{item}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailNavBar",
  props:{
    //只需要在使用的时候传文字，根据文字显示几个
    //没有必要使用插槽
    titles:{
      type:Array,
      default(){
        return[]
      }
    }
  },
  data(){
    return{
      currentIndex:0
    }
  },
  methods: {
    titleClick (index) {
      this.currentIndex = index
      console.log(index);
      this.$emit('clickTitle', index) /* 将子组件数据传递到父组件 */
    },
    backClick(){
      this.$router.back()
    }
  }
}
</script>

<style scoped>
.nav-bar{
  display: flex;
  height: 44px;
  line-height: 44px;
  text-align: center;
  /*  一般导航栏都是44*/
  box-shadow: 0 1px 1px rgba(101,101,101,0.1); /**/
}

.tab-control{
  display: flex;
  text-align: center;
  font-size: 15px;
  /*float: right;*/
  height: 44px;
  line-height: 44px;
  background-color: #fff; ;
}
.tab-control-items{
  /*width: 23vm ;*/
  margin:0 15px;
  height: 44px;
  line-height: 44px;
}
.active{
  color: var(--color-hight-text);
}
.active span{
  border-bottom: 3px solid var(--color-tint);

}
.active{
  color: var(--color-hight-text);
}
.back{
  width: 60px;
  float: left;
}
.back img{

  margin: 12px auto;
}

</style>
