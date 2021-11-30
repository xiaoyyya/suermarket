<template>
  <div class="recommend">
    <div v-for="item in recommends" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
   </div>
  </div>
</template>

<script>

export default {
  name: "HomeRecommend",
  props:{
    recommends:{
      type:Array
    }
  }
}
</script>

<style scoped>
  .recommend{
    display: flex;
    width: 100%;
    text-align: center;
    font-size: 12px;
    padding: 15px 0 20px;
    border-bottom: 8px solid #ccc;
  }
  .recommend-item{
    flex: 1;/*均等分*/
  }
  .recommend-item img{
    width: 70px;
    height: 70px;

  }

</style>
