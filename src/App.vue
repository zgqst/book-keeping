<template>
  <div id="app">
    <Layout v-if="exist">
      <router-view/>
    </Layout>
    <router-view name="NotFound" v-else-if="!exist" ></router-view>
  </div>
</template>

<script>

export default {
  computed: {
    exist() {
      return this.$route.matched[0].path !== '*';
    }
  }
}
</script>

<style lang="scss">
@import "~@/assets/style/reset.scss";
@import "~@/assets/style/helper.scss";

#app {
  line-height: 1.5;
  font-family: $font-hei;
}
</style>
