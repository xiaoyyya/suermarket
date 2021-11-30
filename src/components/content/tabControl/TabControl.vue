<template>
  <div class="tab-control">
    <div v-for="(item, index) in titles" :key="index"
    class="tab-control-items" :class="{active: index === currentIndex}"
         @click="itemClick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>

export default {
  name: "TabControl",
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
    itemClick (index) {
      this.currentIndex = index
      this.$emit('tabClick',index) /* 将子组件数据传递到父组件 */
    }
  }
}
</script>

<style scoped>
.tab-control{
  display: flex;
  text-align: center;
  font-size: 15px;
  height: 40px;
  line-height: 40px;
  background-color: #fff; ;
}
.tab-control-items{
  flex: 1;
  line-height: 40px;
}
.active{
  color: var(--color-hight-text);
}
.active span{
  border-bottom: 3px solid var(--color-tint);
  padding: 5px;
}
</style>
