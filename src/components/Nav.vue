<template>
  <nav>
    <router-link to="/money" class="nav-item" tag="div">
      <Icon name="money"></Icon>
      <p>记账</p>
    </router-link>
    <router-link to="/labels" class="nav-item" tag="div">
      <Icon name="labels"></Icon>
      <p>标签</p>
    </router-link>
    <router-link to="/statistic" class="nav-item" tag="div">
      <Icon name="statistic"></Icon>
      <p>统计</p>
    </router-link>
  </nav>
</template>

<script lang="ts">

import Icon from '@/components/Icon.vue';

export default {
  name: 'Nav',
  components: {
    Icon,
  },
};
</script>

<style scoped lang="scss">
nav{
  display: flex;
  flex-direction: row;
  box-shadow: 0 0 5px 2px rgba(116,185,255,.3);
  .nav-item {
    text-decoration: none;
    color: #2c3e50;
    font-weight: bold;
    font-size: 20px;
    display: flex;
    flex-direction: column;
    width: 33.3333333%;
    justify-content: center;
    align-items: center;
    padding-top: 5px;
    padding-bottom: 3px;
    cursor: pointer;
  }

}
.router-link-active {
  color: #42b983;
  box-shadow: inset 0 0 20px 4px rgba(116,185,255,.35);
}

</style>