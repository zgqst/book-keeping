<template>
  <div id="wrapper">
    <div class="upper">
      <div class="back"></div>
      <div class="top">
        <span class="logo">爱记账</span>
        <div class="time" @click="chooseMonth">
          {{ time.year }}.{{ time.month }}
        </div>
        <Icon name="down" class="down" @click.native="chooseMonth"></Icon>
        <a-modal v-model="visible" :centered="true" :width="300" class="modal" cancelText="取消" okText="确定"
                 :maskClosable="true" @ok="ok">
          <div class="wrapper">
            <div class="button-wrapper">
              <button @click="upwardYear">
                <Icon name="upward"></Icon>
              </button>
              <div class="year">{{ tempYear }}</div>
              <button @click="downwardYear">
                <Icon name="downward"></Icon>
              </button>
            </div>
            <div class="button-wrapper">
              <button @click="upwardMonth">
                <Icon name="upward"></Icon>
              </button>
              <div class="month">{{ tempMonth }}</div>

              <button @click="downwardMonth">
                <Icon name="downward"></Icon>
              </button>
            </div>
          </div>
        </a-modal>
      </div>
      <div class="money">
        <div class="total"><strong>本月结余</strong>{{ getSum() }}</div>
        <div class="income"><span>收入</span>{{ getIncomeSum() }}</div>
        <div class="pay"><span>支出</span>{{ getPaySum() }}</div>
      </div>
    </div>
    <Nav></Nav>
    <div class="above">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';
import Nav from '@/components/Nav.vue';

@Component({
  components: {
    Nav
  }
}) export default class Layout extends Vue {
  visible = false;
  time: { year: number; month: number } = this.$store.state.time;
  tempYear = this.time.year;
  tempMonth = this.time.month;

  get detailList() {
    this.$store.commit('getDetailList');
    return this.$store.state.detailList;
  }

  chooseMonth() {
    this.visible = !this.visible;
  }

  upwardYear() {
    this.tempYear += 1;
  }

  upwardMonth() {
    if (this.tempMonth === 12) {
      return;
    }
    this.tempMonth += 1;
  }

  downwardYear() {
    this.tempYear -= 1;
  }

  downwardMonth() {
    if (this.tempMonth === 1) {
      return;
    }
    this.tempMonth -= 1;
  }

  ok() {
    this.$store.commit('setTime', {year: this.tempYear, month: this.tempMonth});
    this.visible = false;
  }

  getPaySum() {
    const detailList = this.detailList;
    const payList = [];
    for (const key in detailList) {
      if (Object.prototype.hasOwnProperty.call(detailList, key)) {
        for (let i = 0; i < detailList[key].length; i++) {
          if (detailList[key][i].type === '-') {
            payList.push(detailList[key][i].amount);
          }
        }
      }
    }
    if (payList.length === 0) {
      return '0';
    }
    const sum = payList.reduce((pre, current) => {
      return parseFloat(pre) + parseFloat(current);
    });
    return '-' + sum;
  }

  getIncomeSum() {
    const detailList = this.detailList;
    const incomeList = [];
    for (const key in detailList) {
      if (Object.prototype.hasOwnProperty.call(detailList, key)) {
        for (let i = 0; i < detailList[key].length; i++) {
          if (detailList[key][i].type === '+') {
            incomeList.push(detailList[key][i].amount);
          }
        }
      }
    }
    if (incomeList.length === 0) {
      return '0';
    }
    const sum = incomeList.reduce((pre, current) => {
      return parseFloat(pre) + parseFloat(current);
    });
    return '+' + sum;
  }

  getSum() {
    const sum = parseFloat(this.getPaySum()) + parseFloat(this.getIncomeSum());
    if (sum > 0) {
      return '+' + sum;
    } else if (sum === 0) {
      return '0';
    } else {
      return sum+'';
    }
  }
}
</script>

<style scoped lang="scss">
@import "~@/assets/style/helper.scss";

.wrapper {
  display: flex;
  justify-content: center;

  .button-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 80px;

    button {
      width: 50px;
      height: 40px;
      border: none;
      outline: none;
      border-radius: 15%;
      cursor: pointer;
    }

    .year, .month {
      font-size: $font-size*1.5;
      margin-bottom: 2px;
    }
  }
}

#wrapper {
  display: flex;
  flex-direction: column;
  height: 100vh;

  .upper {
    display: flex;
    flex-direction: column;
    padding-top: 3px;
    color: $color-font;
    position: relative;

    .back {
      background: url("~@/assets/images/upper2.jpg") no-repeat;
      z-index: -1;
      background-size: cover;
      filter: blur(2px) brightness(90%);;
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
    }

    .top {
      padding: 5px 0 5px 20px;
      display: flex;
      font-size: $font-size*1.4;
      border-bottom: 1px solid #fff;
      align-items: center;

      .time {
        margin-left: 20px;
        padding-left: 50px;
        border-left: 1px solid;
        display: flex;
        cursor: pointer;
      }

      .down {
        font-size: $font-size*.6;
        margin-left: 2px;
        margin-top: 4px;
        cursor: pointer;
      }
    }

    .money {
      padding: 5px 30px 10px 20px;
      font-family: $font-mono;
      font-size: $font-size*1.4;

      &.money:after {
        content: '';
        display: block;
        clear: both;
      }

      span {
        margin-right: 15px;
        font-family: $font-song;
        font-weight: bold;
      }

      .total {
        display: flex;
        flex-direction: column;
        font-size: $font-size*2.5;
        margin-left: -2px;

        strong {
          margin-left: 2px;
          margin-bottom: -6px;
          font-family: $font-song;
          font-size: $font-size*1.4;
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
    background: #ededed;
    position: relative;
  }
}

</style>