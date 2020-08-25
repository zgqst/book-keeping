<template>
  <div>
    <Layout>
      <div class="explain" :class="{disappear: isDisappear()}">
        <div class="noRecord">
          <Icon name="noRecord"></Icon>
        </div>
        本月还没有任何收支记录哟~
      </div>
      <div class="echarts"></div>
      <div class="btn">
        <button @click="selectPay" class="statistic-pay selected">支出</button>
        <button @click="selectIncome" class="statistic-income">收入</button>
      </div>
      <ul>
        <li v-for="item in getData(type)" :key="item.name" class="item">
          <div class="index">{{ getData(type).findIndex((i) => {return i.name === item.name}) + 1 }}</div>
          <div class="name">{{ item.name }}</div>
          <div class="value">
            {{ type }}{{ item.value }}
          </div>
        </li>
      </ul>
    </Layout>
  </div>
</template>

<script lang="ts">
import {Vue, Component, Watch} from 'vue-property-decorator';

const echarts = require('echarts');

@Component export default class Statistic extends Vue {
  n = false;
  type = '-';

  get detailList() {
    if (this.n) {//为了避免无限循环渲染的问题，因为getDetailList是返回
      // 一个对象，因此触发commit会导致detailList的地址的更新
      //会触发v-for对视图的渲染，在计算属性中保证地址只更新一次，那么就只会渲染一次
      //但是这导致了，初始页面已经经过了一次数据获取，这时n是true，因此添加记录后不会更新数据
      //因此在NumberPad的save方法中对每一次保存进行detailList的重新计算
      return this.$store.state.detailList;
    }
    this.$store.commit('getDetailList');
    this.n = true;
    return this.$store.state.detailList;
  }

  selectPay() {
    this.type = '-';
    const data = this.getData(this.type);
    document.querySelector('.statistic-income')!.className = 'statistic-income';
    document.querySelector('.statistic-pay')!.className = 'statistic-pay selected';
    this.renderECharts(data, '支出');
  }

  selectIncome() {
    this.type = '+';
    const data = this.getData(this.type);
    document.querySelector('.statistic-pay')!.className = 'statistic-pay';
    document.querySelector('.statistic-income')!.className = 'statistic-income selected';
    this.renderECharts(data, '收入');
  }

  getData(type: string) {
    const initData: TableData[] = [];
    for (const key in this.detailList) {
      this.detailList[key].forEach((item: RecordItem) => {
        if (item.type === type) {
          initData.push({value: parseFloat(item.amount), name: item.tag});
        }
      });
    }
    const completeData: TableData[] = [];

    initData.forEach((item) => {
      const index = completeData.findIndex((i) => {
        return item.name === i.name;
      });
      if (index === -1) {
        completeData.push(item);
      } else {
        completeData[index].value += item.value;
      }
    });
    completeData.sort((a, b) => {
      return a.value - b.value;
    });
    return completeData;
  }

  renderECharts(data: TableData[], title: string) {
    const myEcharts = echarts.init(document.querySelector('.echarts'));
    myEcharts.setOption({
      backgroundColor: '#fff',
      title: {
        text: '分类报表',
        left: 'center',
        top: 20,
        textStyle: {
          color: '#333',
          fontWeight: 'bold'
        }
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      series: [
        {
          name: title,
          type: 'pie',
          top: '10',
          radius: ['50%', '70%'],
          center: ['50%', '50%'],
          avoidLabelOverlap: false,
          data: data.sort(function (a, b) {
            return a.value - b.value;
          }),
          label: {
            position: 'center',
            show: false
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '20',
              fontWeight: 'bold',
              fontFamily: 'Microsoft YaHei'
            }
          },
          labelLine: {
            show: false
          },
          itemStyle: {
            shadowBlur: 200,
            shadowColor: 'rgba(0, 0, 0, 0.3)'
          },
          animationType: 'scale',
          animationDuration: '300',
          animationEasing: 'quadraticOut'
        }
      ]
    });
  }

  isDisappear() {
    return Object.keys(this.detailList).length !== 0;
  }

  setDisplay(state: string) {
    const echarts = document.querySelector('.echarts');
    const btn = document.querySelector('.btn');
    echarts.style.display = state;
    btn.style.display = state;
  }

  mounted() {
    if (Object.keys(this.detailList).length === 0) {
      this.setDisplay('none');
    } else {
      const timer = setTimeout(() => {
            this.selectPay();
            clearTimeout(timer);
          }, 0
      );
    }
  }

  @Watch('detailList')
  onDetailListChanged() {
    if (Object.keys(this.detailList).length === 0) {
      this.setDisplay('none');
    } else {
      this.setDisplay('block');
      this.selectPay();
    }
  }
}

</script>

<style scoped lang="scss">
@import "~@/assets/style/helper.scss";

.statistic {
  position: relative;

}

.disappear {
  display: none;
}

.explain {
  font-size: $font-size*1.5;
  width: 80vw;
  margin-left: auto;
  margin-right: auto;
  text-align: center;

  .noRecord {
    font-size: 100px;
    margin-bottom: -10px;
  }
}

.echarts {
  margin: 8px;
  height: 60%;
  font-size: $font-size*1.4;
  background: #fff;
}

.btn {
  position: absolute;
  top: 55%;
  left: 50%;
  transform: translatex(-50%);

  button {
    padding: 0 5px 0 5px;
    border: 1px solid #b6b6b6;
  }

  button:first-child {
    margin-right: 20px;
  }

  .selected {
    color: #fff;
    background: #22a6b3;
  }
}

.item {
  font-size: $font-size*1.2;
  display: flex;
  margin: 8px;
  border-radius: 10px;
  padding: 10px;
  background: #fff;
  color: #000;

  .index {
    margin-right: 10px;
    margin-left: 25px;
  }

  .value {
    margin-left: auto;
    margin-right: 20px;
  }
}

</style>