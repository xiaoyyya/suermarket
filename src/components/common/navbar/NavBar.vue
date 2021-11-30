<template>
  <div class="nav-bar">
    <div class="left">
      <slot name="left"></slot>
    </div>
    <div class="center">
      <slot name="center"></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavBar",
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
  .left, .right{
    width: 60px;
  }
  .center{
    /*margin: 0 auto;*/
    flex: 1;
    /*bottom: 10px;*/
  }

</style>
