<template>
<div id="app" class="wrapper">

  <router-view  v-slot="{Component}" >
  <keep-alive>
    <component :is="Component"  v-if="$route.meta.keepAlive"/>
  </keep-alive>
    <component :is="Component"  v-if="!$route.meta.keepAlive"/>
  </router-view>
  <main-tab-bar></main-tab-bar>
</div>
</template>

<script>
import MainTabBar from "components/content/maintabbar/MainTabBar";

export default {
  name: 'App',
  components: {
    MainTabBar
  }
}
</script>

<style>
@import "assets/css/base.css";

</style>
