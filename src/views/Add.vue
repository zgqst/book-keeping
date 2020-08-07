<template>
  <div id="add">
    <router-link to="/detail" class="esc" tag="div">
      <Icon name="esc"></Icon>
    </router-link>
    <div class="labels">
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
    <NumberPad></NumberPad>
  </div>
</template>

<script lang="ts">
import NumberPad from '@/components/NumberPad.vue';

export default {
  name: 'Add',
  components: {
    NumberPad,
  },
};
</script>

<style scoped lang="scss">
#add {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  background-color: #ffffff;

  .esc {
    font-size: 30px;
    padding-bottom: -20px;
    position: absolute;
    top: 10px;
    left: 10px;
    cursor: pointer;
  }

  .labels {
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


}


</style>