<template>
  <div id="numberPad">
    <a-date-picker class="date" :defaultValue="date.now" :format="date.format"
                 :locale="date.locale"  @change="getDate"></a-date-picker>
    <label>
      <span>备注:</span>
      <input type="text" placeholder="在这里输入备注" v-model="record.message">
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
      <button @click="save">支出</button>
      <button @click="input" class="point">.</button>
      <button @click="input" class="zero">0</button>
      <button @click="save">收入</button>
    </div>
  </div>
</template>

<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator';

import moment from 'moment';
import {default as swal} from 'sweetalert2';
import locale from '@/zh-CN';


window.localStorage.setItem('version', '1.0.0');
@Component export default class NumberPad extends Vue {
  date: DatePicker = {
    now: moment(),
    format: 'YYYY/MM/DD',
    locale:locale
  };

  record: RecordItem = {
    time: moment().format(),
    tag: '',
    message: '',
    type: '',
    amount: ''
  };
  output = '0';

  get recordList() {
    return this.$store.getters.recordList();
  }

  @Prop(String) value!: string;//传入的tag信息

  getDate(time: any) {
    if(!time){
      this.record.time = time;
      return;
    }
    this.record.time = time.format();
  }

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

  save(event: MouseEvent) {
    const content = (event.target as HTMLButtonElement).textContent as string;
    if (this.output === '0') {
      swal.fire({
        text:'添加失败！金额为空！',
        width:300,
        confirmButtonText:'确认',
        showClass: {
          popup: 'animate__animated animate__fadeIn animate__faster'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOut animate__faster'
        },
      });
      return;
    }
    if (content === '收入') {
      this.record.type = '+';
    } else {
      this.record.type = '-';
    }
    this.record.tag = this.value;
    if (!this.record.tag) {
      swal.fire({
        text:'请选择标签！',
        width:300,
        confirmButtonText:'确认',
        showClass: {
          popup: 'animate__animated animate__fadeIn animate__faster'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOut animate__faster'
        },
      });
      return;
    }
    if (!this.record.time) {
      swal.fire({
        text:'请选择日期！',
        width:300,
        confirmButtonText:'确认',
        showClass: {
          popup: 'animate__animated animate__fadeIn animate__faster'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOut animate__faster'
        },
      });
      return;
    }
    this.record.amount = this.output;
    this.recordList.push(this.record)
    this.$store.commit('updateRecordList', this.recordList);
    this.$store.commit('getDetailList');
    //解决添加记录后detailList不会自动计算的问题，需要手动计算一下
    this.$router.push('/detail');
  }
}
</script>

<style scoped lang="scss">
@import '~@/assets/style/helper.scss';
@import "~animate.css";

#numberPad {
  height: 40%;
  position: relative;
  bottom: 0;
  background: #fff;
  border-top: 1px solid #c1c0c0;
  box-shadow: 0 -2px 8px -5px #000;

  .date {
    height: 10%;

  }

  label {
    display: flex;
    align-items: center;
    margin-left: 2%;
    height: 15%;

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

    height: 75%;
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

      &.zero {
        width: 47%;
      }

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