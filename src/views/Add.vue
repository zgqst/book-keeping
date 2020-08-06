<template>
  <div id="add">
    <router-link to="/detail" class="esc" tag="div">
      <Icon name="esc"></Icon>
    </router-link>
    <div class="labels">
      <Labels></Labels>
    </div>
    <label>
      <span>备注</span>
      <input type="text" placeholder="今天又有什么收获呢~" autofocus>
    </label>
    <div class="numberPad">
      <NumberPad></NumberPad>
    </div>
  </div>
</template>

<script lang="ts">
import Labels from '@/components/Labels.vue';
import NumberPad from '@/components/NumberPad.vue';

export default {
  name: 'Add',
  components: {
    Labels,
    NumberPad,
  },
};
</script>

<style scoped lang="scss">
#add {
  position: relative;
  width: 100vw;
  height: 100vh;
  background-color: #ffffff;

  .esc {
    font-size: 30px;
    padding-bottom: -20px;
    top: 15px;
    left: 15px;
  }

  label {
    display: flex;
    input {
      border: none;
      margin-left: 20px;
    }
  }


}


</style>