<template>
  <div>
    <Layout>
      <div class="explain" :class="{disappear: isDisappear()}">
        <div class="noRecord">
          <Icon name="noRecord"></Icon>
        </div>
        本月还没有任何收支记录哟~
      </div>
      <ul class="detail">
        <li class="date" v-for="(value,name) in detailList" :key="name">
          <div class="title">{{ name }}</div>
          <router-link class="dateDetail" :to="`/detail/${item.tag}?record=${item.time}`"
                       v-for="item in value" :key="item.time">
            <div class="point"></div>
            <div>{{ item.tag }}</div>
            <div class="message" @click.prevent>{{ item.message }}</div>
            <div class="amount">{{ item.type }}{{ item.amount }}</div>
          </router-link>
        </li>
      </ul>
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
import {Vue, Component} from 'vue-property-decorator';

@Component export default class Detail extends Vue {
  n = false;
  get detailList() {
    if(this.n){//为了避免无限循环渲染的问题，因为getDetailList是返回
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

  isDisappear() {
    return Object.keys(this.detailList).length !== 0;
  }

}

</script>
<style scoped lang="scss">
@import "~@/assets/style/helper.scss";

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

.date {
  font-size: $font-size*1.4;
  background: #fff;
  margin: 8px;
  border-radius: 10px;
  padding: 10px;

  .title {
    font-weight: bold;
    margin-left: 5px;
  }

  .dateDetail {
    display: flex;
    font-size: $font-size*1.2;
    padding-top: 10px;
    margin-left: 15px;
    margin-right: 10px;
    align-items: center;
    color: #000;
    border-bottom: 1px solid #d0d0d0;

    .point {
      width: 4px;
      height: 4px;
      border-radius: 50%;
      background: #000;
      margin-right: 10px;
    }

    .message {
      width: 150px;
      color: #aaaaaa;
      font-size: $font-size;
      margin-left: 10px;
      overflow-x: auto;
      white-space: nowrap;

      &::-webkit-scrollbar {
        display: none;
      }

      @media screen and (min-width: 900px) {
        width: 400px;
      }
    }

    .amount {
      margin-left: auto;


    }
  }
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
    transition: all .1s ease-in-out;
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