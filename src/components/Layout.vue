<template>
  <div id="main-part">
    <div class="content">
      <slot></slot>
    </div>
    <Nav></Nav>
  </div>
</template>

<script lang="ts">
import Nav from '@/components/Nav.vue';

export default {
name: "Layout",
  components:{
  Nav
  }
}
</script>

<style scoped lang="scss">

#main-part{
  display: flex;
  flex-direction: column;
  height: 100vh;
  .content{
    flex-grow: 1;
    overflow:auto;
  }
}
</style>