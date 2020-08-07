<template>
  <div id="numberPad">
    <label>
      <span>备注:</span>
      <input type="text" placeholder="今天有什么收获呢~" autofocus>
      <input type="number" value="0" class="result">
    </label>
    <div class="buttons">
      <button>1</button>
      <button>2</button>
      <button>3</button>
      <button class="backspace">
        <Icon name="backspace"></Icon>
      </button>
      <button>4</button>
      <button>5</button>
      <button>6</button>
      <button>清空</button>
      <button>7</button>
      <button>8</button>
      <button>9</button>
      <button>支出</button>
      <button>再记</button>
      <button class="point">.</button>
      <button>0</button>
      <button>收入</button>
    </div>
  </div>
</template>

<script lang="ts">
import {Vue,Component} from 'vue-property-decorator';

@Component export default class NumberPad extends Vue{

}
</script>

<style scoped lang="scss">
@import '~@/assets/style/helper.scss';

#numberPad {
  height: 70%;
  position: relative;
  bottom: 0;
  border-top: 1px solid #c1c0c0;
  box-shadow: 0 -2px 8px -5px #000;

  label {
    display: flex;
    align-items: center;
    margin-left: 2%;
    height: 20%;

    span {
      display: block;
      margin-right: 10px;
    }

    input {
      height: 90%;
      font-size: 16px;
      width: 40%;
      border: none;

      &.result {
        margin-left: auto;
        text-align: right;
        margin-right: 4%;
        font-size: $font-size*1.5;
        &::-webkit-inner-spin-button {
          -webkit-appearance: none;
        }

        &::-webkit-outer-spin-button {
          -webkit-appearance: none;
        }
      }
    }
  }

  .buttons {
    @extend %clearFix;

    height: 80%;
    display: flex;
    flex-wrap: wrap;

    button {

      height: 20%;
      margin-bottom: 8px;
      margin-left: 2%;
      width: 22.5%;
      background: transparent;
      border: 1px solid rgba(0, 0, 0, 0);
      border-radius: 4px;
      box-shadow: 6px 6px 10px -1px rgba(0, 0, 0, 0.15),
      -6px -6px 10px -1px rgba(255, 255, 255, 0.7);

      &.point {
        font-weight: bold;
      }

      &.backspace {
        font-size: $font-size*1.3;
        padding-top: 2px;
      }

      &:active {
        box-shadow: inset 3px 3px 6px -1px rgba(0, 0, 0, 0.2),
        inset 6px 6px 6px -1px rgba(255, 255, 255, 0.7),
        -0.5px -0.5px 0px rgba(255, 255, 255, 1),
        0.5px 0.5px 0px rgba(0, 0, 0, 0.15),
        0px 12px 10px -10px rgba(0, 0, 0, 0.05);
        border: 1px solid rgba(0, 0, 0, 0.01);
        transform: translateY(4px)
      }

    }
  }
}


</style>