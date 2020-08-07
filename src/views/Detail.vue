<template>
  <div id="#detail">
    <Layout>
      Detail
      <router-link class="new" to="/detail/add">
        <Icon name="edit"></Icon>
        <span>+</span>
      </router-link>
    </Layout>
    <div id="detail-add">
      <transition name="slide">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
import '@/assets/icons/edit.svg';
import {Vue, Component} from 'vue-property-decorator';

@Component export default class Detail extends Vue {
}
</script>
<style scoped lang="scss">
@import "~@/assets/style/helper.scss";

#detail {
  position: relative;
  z-index: 1;
  height: 100vh;
}

#detail-add {
  position: absolute;
  top: 0;
  left: 0;

  .slide-enter {
    transform: translateY(100vh);
  }

  .slide-leave-to {
    transform: translateY(100vh);
  }

  .slide-enter-active, .slide-leave-active {
    transition: all .3s ease-in-out;
  }
}

.new {
  position: absolute;
  top: 83%;
  left: 50%;
  font-weight: bold;
  font-size: $font-size*2.2;
  color: #fff;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 50%;
  border: 2px solid #34ace0;
  background: #34ace0;
  width: 70px;
  height: 70px;
  cursor: pointer;
  padding-top: 5px;
  box-shadow: 0 7px 20px -10px #000;

  span {
    margin-top: -15px;
  }
}
</style>