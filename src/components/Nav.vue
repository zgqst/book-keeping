<template>
  <nav class="nav">
    <div class="trans" ref="qqq"></div>
    <router-link to="/detail" class="nav-item" tag="div" @click.native="goTo('.item1')">
      <Icon name="detail" class="icon"></Icon>
      <div class="item1" style="display: inline-block;">明细
      </div>
    </router-link>
    <router-link to="/statistic" class="nav-item" tag="div" @click.native="goTo('.item2')">
      <Icon name="statistic"></Icon>
      <div class="item2" style="display: inline-block;">统计</div>
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
  mounted() {
    if (this.$route.path.indexOf('detail') === -1) {
      this.goTo('.item2');
    } else {
      this.goTo('.item1');
    }
  },
  methods: {
    goTo(item) {
      const trans = document.querySelector('.trans');
      const nav = document.querySelector('nav');
      const div = document.querySelector(`${item}`);
      const top = div.getBoundingClientRect().bottom - nav.getBoundingClientRect().top;
      const width = div.clientWidth;
      const left = div.getBoundingClientRect().left;
      trans.style.top = top + 'px';
      trans.style.left = left - 40 + 'px';
      trans.style.width = width + 50 + 'px';
    },
  },
};
</script>

<style scoped lang="scss">
@import "~@/assets/style/helper.scss";

nav {
  display: flex;
  flex-direction: row;
  font-family: $font-hei;
  position: relative;
  box-shadow: 0 14px 7px -18px #000;

  .nav-item {
    text-decoration: none;
    color: #2c3e50;
    font-weight: bold;
    font-size: $font-size*1.5;
    display: flex;
    width: 50%;
    justify-content: center;
    align-items: center;
    padding-top: 3px;
    padding-bottom: 3px;
    cursor: pointer;
  }
}

.trans {
  border-bottom: 2px solid;
  position: absolute;
  transition: all .3s;
}

</style>