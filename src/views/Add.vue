<template>
  <div id="add">
    <router-link to="/detail" class="esc" tag="div">
      <Icon name="esc" ></Icon>
    </router-link>
    <Tags :value.sync="tagName"></Tags>
    <NumberPad :value="tagName"></NumberPad>
  </div>
</template>

<script lang="ts">
import NumberPad from '@/components/Add/NumberPad.vue';
import Tags from '@/components/Add/Tags.vue';
import {Vue, Component} from 'vue-property-decorator';

@Component({
  components: {
    NumberPad,
    Tags
  }
})
export default class Add extends Vue {
  tagName='';
}

</script>

<style scoped lang="scss">

#add {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  background-color: #ffffff;

  .date {
    position: relative;
    top: 50px;
  }

  .esc {
    width: 100vw;
    height:8vh;
    font-size: 20px;
    position: absolute;
    padding-top: 10px;
    padding-left: 13px;
    padding-bottom: 7px;
    top: 0;
    left: 0;
    cursor: pointer;
    background: #48dbfb;
  }
}
</style>