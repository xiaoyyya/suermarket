<template>
  <swiper>
    <swiper-item v-for="(item,index) in banners" :key="index">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imageLoad"></a>
    </swiper-item>
  </swiper>

</template>

<script>
import {Swiper, SwiperItem} from "components/common/swiper";
export default {
  name: "HomeSwiper",
  props:{
    banners:{
      type:Array,
      default(){
        return []
      }
    }
  },
  data () {
    return {
      isLoad:false
    }
    },
  components:{
    Swiper,
    SwiperItem
  },
  methods: {
    imageLoad () {
      if(!this.isLoad){
        this.$emit('swiperImagLoad')
        this.isLoad = true // 只加载一张图片就可以了，提高性能
      }
    }
  }
}
</script>

<style scoped>
img{
   width: 100%;
   /*height: 160px;*/
 }
</style>
