<template>
  <div id="numberPad">
    <a-date-picker class="date" :locale="date.locale" :defaultValue="date.now" :format="date.format"
                   @change="getDate"></a-date-picker>

    <label>
      <span>备注:</span>
      <input type="text" placeholder="在这里输入备注" v-model="tempMessage">
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
import {Vue, Component, Prop, Watch} from 'vue-property-decorator';
import DatePicker from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import moment from 'moment';
import locale from 'ant-design-vue/lib/date-picker/locale/zh_CN.js';

Vue.use(DatePicker);

interface Record {
  year: number | undefined;
  month: number | undefined;
  date: number | undefined;
  tag: string;
  message: string;
  type: string;
  amount: string;
}

interface DatePicker {
  now: any;
  format: string;
  locale: object;
}

window.localStorage.setItem('version', '1.0.0');
@Component export default class NumberPad extends Vue {
  date: DatePicker = {
    now: moment(),
    format: 'YYYY/MM/DD',
    locale: locale
  };

  record: Record = {
    year: undefined,
    month: undefined,
    date: undefined,
    tag: '',
    message: '',
    type: '',
    amount: ''
  };
  output = '0';
  tempYear = moment().year();
  tempMonth = moment().month() + 1;
  tempDate = moment().date();
  tempType = '';
  tempMessage = '';
  recordList: Record[] = [];

  @Prop(String) value!: string;

  getDate(time: any) {
    this.tempYear = time.year();
    this.tempMonth = time.month() + 1;
    this.tempDate = time.date();
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
      alert('添加失败！金额为空！');
      return;
    }
    if (content === '收入') {
      this.tempType = '+';
    } else {
      this.tempType = '-';
    }
    this.record.type = this.tempType;
    this.record.tag = this.value;
    this.record.amount = this.output;
    this.record.year = this.tempYear;
    this.record.month = this.tempMonth;
    this.record.date = this.tempDate;
    this.record.message = this.tempMessage;
    const copy ={...this.record}
    this.recordList.push(copy);
    this.output = '0';
    this.tempMessage='';
  }
  @Watch('recordList')
  onRecordListChange(){
    window.localStorage.setItem('recordList',JSON.stringify(this.recordList))
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