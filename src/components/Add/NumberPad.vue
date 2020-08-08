<template>
  <div id="numberPad">
    <label>
      <span>备注:</span>
      <input type="text" placeholder="在这里输入备注" v-model="message">
      <input type="text" :value="output" class="result">
    </label>
    <div class="buttons">
      <button @click="input">1</button>
      <button @click="input">2</button>
      <button @click="input">3</button>
      <button @click="backspace" class="backspace">
        <Icon name="backspace"></Icon>
      </button>
      <button @click="input">4</button>
      <button @click="input">5</button>
      <button @click="input">6</button>
      <button @click="clear">清空</button>
      <button @click="input">7</button>
      <button @click="input">8</button>
      <button @click="input">9</button>
      <button @click="saveBack">支出</button>
      <button @click="save">再记</button>
      <button @click="input" class="point">.</button>
      <button @click="input">0</button>
      <button @click="saveBack">收入</button>
    </div>
  </div>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';

@Component export default class NumberPad extends Vue {
  output = '0';
  result = '';
  message = '';
  input(event: MouseEvent) {
    const content = (event.target as HTMLButtonElement).textContent as string;
    if (this.output === '0' && '0123456789'.includes(content)) {
      this.output = content;
      return;
    } else if (this.output.includes('.') && content === '.') {
      return;
    } else if (this.output.includes('.') && this.output.slice(-3, -2) === '.') {
      return;
    } else if (this.output.length === 16) {
      return;
    }
    this.output += content;
  }

  backspace() {
    if (this.output.length === 1) {
      this.output = '0';
      return;
    }
    this.output = this.output.slice(0, -1);
  }

  clear() {
    this.output = '0';
  }

  saveBack(event: MouseEvent) {
    const content = (event.target as HTMLButtonElement).textContent as string;
    if (content === '收入') {
      this.result = '+' + this.output;
    } else {
      this.result = '-' + this.output;
    }
    this.save();
    this.$router.back();
  }
  save(){
    console.log('saved');
  }
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
      width: 33%;
      border: none;

      &.result {
        margin-left: auto;
        text-align: right;
        width: 50%;
        margin-right: 4%;
        font-size: $font-size*1.4;
        color: transparent;
        text-shadow: 0 0 0 #000;
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