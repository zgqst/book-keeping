<template>
  <div id="main-part">
    <div class="upper">
      <div class="top">
        <span class="logo">爱记账</span>
        <div class="time">
          2020.08
        </div>
      </div>
      <div class="money">
        <div class="total"><strong>本月结余</strong>2000</div>
        <div class="income"><span>收入</span>+1000</div>
        <div class="pay"><span>支出</span>-1000</div>
      </div>
    </div>
    <Nav></Nav>
    <div class="above">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import Nav from '@/components/Nav.vue';

export default {
  name: 'Layout',
  components: {
    Nav,
  },
};
</script>

<style scoped lang="scss">
@import "~@/assets/style/helper.scss";

#main-part {
  display: flex;
  flex-direction: column;
  height: 100vh;
  font-family: $font-hei;

  .upper {
    display: flex;
    flex-direction: column;
    padding-top: 3px;
    background: #ffb8b8;
    color: $color-font;

    .top {
      padding: 5px 0 5px 20px;
      display: flex;
      font-size: $font-size*1.4;
      border-bottom: 1px solid #656464;

      .time {
        margin-left: 20px;
        padding-left: 25px;
        border-left: 1px solid;
        display: flex;
      }
    }

    .money {
      padding: 5px 30px 10px 20px;
      font-family: Consolas, monospace;
      font-size: $font-size*1.3;

      &.money:after {
        content: '';
        display: block;
        clear: both;
      }

      span {
        margin-right: 15px;
        font-family: $font-hei;
      }

      .total {
        display: flex;
        flex-direction: column;
        font-size: $font-size*2.5;
        margin-left: -2px;

        strong {
          margin-left: 2px;
          margin-bottom: -6px;
          font-family: $font-hei;
          font-size: $font-size*1.2;
        }
      }

      .income {
        float: left;
        margin-right: 20px;
      }
    }
  }

  .above {
    flex-grow: 1;
    overflow: auto;
  }
}
</style>