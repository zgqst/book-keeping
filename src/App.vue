<template>
  <div id="app">
      <router-view ></router-view>
  </div>
</template>

<script>

export default {}

</script>

<style lang="scss">
@import "~@/assets/style/reset.scss";
@import "~@/assets/style/helper.scss";

#app {
  position: relative;
  line-height: 1.5;
  font-family: $font-hei;
  overflow: hidden;
}


</style>
