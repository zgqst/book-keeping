<template>
  <div class="tags">
    <ul>
      <li>
        <div>三餐</div>
      </li>
      <li>
        <div>零食</div>
      </li>
      <li>
        <div>衣服</div>
      </li>
      <li>
        <div>交通</div>
      </li>
      <li>
        <div>孩子</div>
      </li>
      <li>
        <div>宠物</div>
      </li>
      <li>
        <div>银行</div>
      </li>
      <li>
        <div>添加</div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';

@Component export default class Tags extends Vue {

}
</script>

<style scoped lang="scss">

.tags {
  height: 100%;
}

ul {
  display: flex;
  flex-wrap: wrap;
  margin-top: 10vh;

  li {
    margin-left: 4vw;
    padding: 10px 0;
    width: 20vw;

    div {
      width: 50px;
      text-align: center;
      margin: 0 auto;
      border: 1px solid;
      border-radius: 20px;
      background: #989797;
      color: #fff;
    }
  }
}
</style>